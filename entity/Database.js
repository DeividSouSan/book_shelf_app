import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js';
import { getDatabase, ref, push, onValue, remove, update, get } from 'https://www.gstatic.com/firebasejs/10.4.0/firebase-database.js'
import { getAuth, signInAnonymously, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/10.4.0/firebase-auth.js'

export class Database {
    constructor(config) {
        this.app = initializeApp(config)
        this.database = getDatabase(this.app)
        this.user = null; // Inicialize user como null

        const auth = getAuth()
        signInAnonymously(auth);

        this.authPromise = new Promise((resolve) => {
            const unsubscribe = onAuthStateChanged(auth, (user) => {
                if (user) {
                    this.user = user.uid;
                    unsubscribe(); // Pare de observar mudanças após a autenticação ser bem-sucedida
                    resolve();
                }
            })
        });
    }

    async getUser() {
        await this.authPromise;
        return this.user
    }

    async readFromDB() {
        await this.getUser()

        return new Promise((resolve) => {
            onValue(ref(this.database, `${this.user}/books`), (snapshot) => {
                resolve(snapshot.val())
            })
        })
    }

    addToDB(newBookInfo) {
        push(ref(this.database, `${this.user}/books`), newBookInfo)
    }

    removeFromDB(bookID) {
        remove(ref(this.database, `${this.user}/books/${bookID}`))
    }

    updateDB(bookID, updateInfo) {
        update(ref(this.database, `${this.user}/books/${bookID}`), { ...updateInfo })
    }
}