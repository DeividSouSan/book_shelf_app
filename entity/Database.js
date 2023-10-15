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

    /* 
    Eu preciso que durante a criação da instância já seja definido quem é o this.user. Dessa maneira eu posso chamar qualquer função create, read, update, delete sem me preocupar em ter que conhecer o ID do usuáriio e sem que isso fique de alguma forma trafegando dentro dos meus componentes. Porém, eu não consigo fazer com que isso seja definido durante a criação.
    */
    async readFromDB() {
        await this.getUser()

        let currentData;

        onValue(ref(this.database, `${this.user}/books`), (snapshot) => {
            if (snapshot) {
                console.log('data exists')
                currentData = snapshot.val()
            } else {
                console.log('data dont exists')
            }

        })

        return currentData
    }

    addToDB(newBookInfo) {
        const books = ref(this.database, `${this.user}/books`)
        push(books, newBookInfo)
    }

    removeFromDB(bookID) {
        const bookPosition = ref(this.database, `${this.user}/books/${bookID}`)
        remove(bookPosition)
    }

    updateDB(bookID, updateInfo) {
        const bookPosition = ref(this.database, `${this.user}/books/${bookID}`)
        const updates = { ...updateInfo }
        update(bookPosition, updates)
    }



}