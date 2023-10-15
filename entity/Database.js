import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js';
import { getDatabase, ref, push, onValue, remove, update } from 'https://www.gstatic.com/firebasejs/10.4.0/firebase-database.js'
import { getAuth, signInAnonymously, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/10.4.0/firebase-auth.js'

export class Database {
    constructor(config) {
        this.app = initializeApp(config)
        this.database = getDatabase(this.app)
        this.auth = getAuth(this.app)
        this.user = null

        signInAnonymously(this.auth);
        this.authPromisse = new Promise((resolve) => {
            const unsubscribe = onAuthStateChanged(this.auth, (user) => {
                if (user) {
                    this.user = user.uid
                    resolve(this.user)
                    unsubscribe(); // Pare de observar mudanças após a autenticação ser bem-sucedida
                }
            })
        })
    }

    async getUser() {
        return await this.authPromisse;
    }

    async readFromDB() {
        const user = await this.getUser()
        return new Promise((resolve) => {
            onValue(ref(this.database, `${user}/books`), (snapshot) => {
                if (snapshot) {
                    resolve(snapshot.val())
                } else {
                    console.log('Não há dados.')
                }
            })
        })
    }

    async addToDB(newBookInfo) {
        const user = await this.getUser()
        push(ref(this.database, `${user}/books`), newBookInfo)
    }

    async removeFromDB(bookID) {
        const user = await this.getUser()
        remove(ref(this.database, `${user}/books/${bookID}`))
    }

    async updateDB(bookID, updateInfo) {
        const user = await this.getUser()
        update(ref(this.database, `${user}/books/${bookID}`), { ...updateInfo })
    }
}