import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js';
import { getDatabase, ref, push, onValue, remove, update, get } from 'https://www.gstatic.com/firebasejs/10.4.0/firebase-database.js'
import { getAuth, signInAnonymously, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/10.4.0/firebase-auth.js'a

class Database {
    constructor(config) {
        this.app = initializeApp(config)
        this.atabase = getDatabase(app)

        signInAnonymously(auth);
        await new Promise((resolve) => {
            const unsubscribe = onAuthStateChanged(auth, (user) => {
                this.user = user.uid;
                unsubscribe();
            });
        });
    }

    addToDB(newBookInfo) {
        const books = ref(database, `${AuthenticatedUserID}/books`)
        push(books, newBookInfo)
    }
    
    removeFromDB(bookID) {
        const bookPosition = ref(database, `${AuthenticatedUserID}/books/${bookID}`)
        remove(bookPosition)
    }
    
    updateDB(bookID, updateInfo) {
        const bookPosition = ref(database, `${AuthenticatedUserID}/books/${bookID}`)
        const updates = { ...updateInfo }
        update(bookPosition, updates)
    }
    
}