import { useEffect, useState, useRef } from "react"
import Card from "../../components/Card/Card"
import AddBookModal from "../../components/AddBookModal/AddBookModal"
import RemoveBookModal from "../../components/RemoveBookModal/RemoveBookModal"
import { BsXSquareFill, BsFillPlusSquareFill } from 'react-icons/bs'
import styles from "./allbooks.module.css"

import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js';
import { getDatabase, ref, push, onValue, remove, update } from 'https://www.gstatic.com/firebasejs/10.4.0/firebase-database.js'
import { getAuth, signInAnonymously } from 'https://www.gstatic.com/firebasejs/10.4.0/firebase-auth.js'

import { firebaseConfig } from "../../../controller/FirebaseConfig.js"

export default function AllBooks() {
	const app = initializeApp(firebaseConfig)
	const database = getDatabase(app)

	const [user, setUser] = useState()

	const [addBookModalStatus, setAddBookModalStatus] = useState(false)
	const [removeBookModalStatus, setRemoveBookModalStatus] = useState(false)

	const [allBooksFromCurrentUser, setAllBooksFromCurrentUser] = useState([]);

	function addToDB(newBookInfo) {
		const books = ref(database, `${user}/books`)
		push(books, newBookInfo)
	}

	function removeFromDB(bookID) {
		const bookPosition = ref(database, `${user}/books/${bookID}`)
		remove(bookPosition)
	}

	function updateDB(bookID, updateInfo) {
		const bookPosition = ref(database, `${user}/books/${bookID}`)
		const updates = { ...updateInfo }
		update(bookPosition, updates)
	}

	useEffect(() => {
		const auth = getAuth();

		signInAnonymously(auth)

		auth.onAuthStateChanged((user) => {
			onValue(ref(database, `${user.uid}/books`), (snapshot) => {
				const data = snapshot.val()
				let dataArray;
				if (data) {
					dataArray = Object.entries(data) /* [[id], [properties]] */
				} else {
					dataArray = "";
				}
				setAllBooksFromCurrentUser(dataArray)
			})

			setUser(user.uid)
		})
	}, [user])

	return (
		<>
			<header>
				<h1 className={styles.pageTitle}>Estante de Livros</h1>
				<div className={styles.btnWrap}>
					<button
						onClick={() => setAddBookModalStatus(!addBookModalStatus)}
					>
						<BsFillPlusSquareFill />Adicionar
					</button>

					<button
						onClick={() => setRemoveBookModalStatus(!removeBookModalStatus)}
					>
						<BsXSquareFill />Remover
					</button>
				</div>
			</header>

			<div className={styles.bookWrap}>
				{
					allBooksFromCurrentUser ? allBooksFromCurrentUser.map((book, index) => (
						<Card
							key={index}
							bookID={book[0]} /* [id] */
							bookData={book[1]} /* [properties] */
							updateDB={updateDB}
						/>)) : <p>Não há livros</p>
				}
			</div>

			{
				addBookModalStatus && <AddBookModal
					setModalStatus={setAddBookModalStatus}
					addToDB={addToDB} />
			}

			{
				removeBookModalStatus && (
					<RemoveBookModal
						setModalStatus={setRemoveBookModalStatus}
						removeFromDB={removeFromDB}
						bookOptions={allBooksFromCurrentUser} />)
			}
		</>
	)
}
