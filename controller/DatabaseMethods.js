import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js';
import { getDatabase, ref, push, onValue, remove, update } from 'https://www.gstatic.com/firebasejs/10.4.0/firebase-database.js'

const firebaseConfig = {
    apiKey: "AIzaSyBIAZbw_SMnAsIFdkrhEDoKtXImvYAwvNo",
    databaseURL: "https://my-book-shelf-454d0-default-rtdb.firebaseio.com/"
}

const app = initializeApp(firebaseConfig)
const database = getDatabase(app)


export function addToDB(currentBookInfo) {
    const books = ref(database, `${user}/books`)
    push(books, currentBookInfo)
}

export function removeFromDB(bookId) {
    const bookPosition = ref(database, `${user}/books/${bookId}`)
    remove(bookPosition)
}

export function updateDB(bookID, updateInfo) {
    const currentBookPosition = ref(database, `${user}/books/${bookID}`)
    const updates = { ...updateInfo }
    update(currentBookPosition, updates)
}

