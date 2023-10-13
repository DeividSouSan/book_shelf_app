import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js';
import { getDatabase, ref, push, onValue, remove, update, get } from 'https://www.gstatic.com/firebasejs/10.4.0/firebase-database.js'
import { getAuth, signInAnonymously, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/10.4.0/firebase-auth.js'


const firebaseConfig = {
    apiKey: "AIzaSyBIAZbw_SMnAsIFdkrhEDoKtXImvYAwvNo",
    databaseURL: "https://my-book-shelf-454d0-default-rtdb.firebaseio.com/"
}

const app = initializeApp(firebaseConfig)
const database = getDatabase(app)

const auth = getAuth();
let AuthenticatedUserID;

export async function authenticate() {
    signInAnonymously(auth);

    let AuthenticatedUserBooksData;

    await new Promise((resolve) => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            AuthenticatedUserID = user.uid;

            onValue(
                ref(database, `${AuthenticatedUserID}/books`),
                (snapshot) => {
                    AuthenticatedUserBooksData = snapshot.val();
                    resolve(AuthenticatedUserBooksData) // ['id', [properties]]
                }
            );
            unsubscribe(); // Para evitar vazamentos de memória
        });
    });

    return AuthenticatedUserBooksData;
}

export function readFromDB() {
    get(ref(database, `${AuthenticatedUserID}/books`)).then((snapshot) => {
        console.log(AuthenticatedUserID)
    })
}

export function listener() {
    return onValue(
        ref(database, `${AuthenticatedUserID}/books`),
        (snapshot) => console.log('O listener rodou'));
}

export function addToDB(newBookInfo) {
    const books = ref(database, `${AuthenticatedUserID}/books`)
    push(books, newBookInfo)
}

export function removeFromDB(bookID) {
    const bookPosition = ref(database, `${AuthenticatedUserID}/books/${bookID}`)
    remove(bookPosition)
}

export function updateDB(bookID, updateInfo) {
    const bookPosition = ref(database, `${AuthenticatedUserID}/books/${bookID}`)
    const updates = { ...updateInfo }
    update(bookPosition, updates)
}
