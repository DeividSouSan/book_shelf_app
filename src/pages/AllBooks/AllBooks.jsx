import { useEffect, useState } from "react"
import Card from "../../components/Card/Card"
import AddBookModal from "../../components/AddBookModal/AddBookModal"
import RemoveBookModal from "../../components/RemoveBookModal/RemoveBookModal"
import { BsXSquareFill, BsFillPlusSquareFill } from 'react-icons/bs'

import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js';
import { getDatabase, ref, push, onValue, remove, update } from 'https://www.gstatic.com/firebasejs/10.4.0/firebase-database.js'
import { getAuth, signInAnonymously } from 'https://www.gstatic.com/firebasejs/10.4.0/firebase-auth.js'

import styles from "./allbooks.module.css"

export default function AllBooks() {
	const firebaseConfig = {
		apiKey: "AIzaSyBIAZbw_SMnAsIFdkrhEDoKtXImvYAwvNo",
		databaseURL: "https://my-book-shelf-454d0-default-rtdb.firebaseio.com/"
	}

	const app = initializeApp(firebaseConfig)
	const database = getDatabase(app)
	const [user, setUser] = useState("")
	const auth = getAuth();
	const [addBook, setAddBook] = useState(false)
	const [removeBook, setRemoveBook] = useState(false)
	const [allBooksData, setAllBooksData] = useState([]);

	function addToDB(currentBookInfo) {
		const books = ref(database, `${user}/books`)

		push(books, currentBookInfo)
	}

	function removeFromDB(bookId) {
		const bookPosition = ref(database, `${user}/books/${bookId}`)
		remove(bookPosition)
	}

	function updateDB(bookID, updateInfo) {
		const currentBookPosition = ref(database, `${user}/books/${bookID}`)
		const updates = {...updateInfo}
		update(currentBookPosition, updates)
	}

	useEffect(() => {
		signInAnonymously(auth)

		auth.onAuthStateChanged((user) => {
			onValue(ref(database, `${user.uid}/books`), (snapshot) => {
				const data = snapshot.val()
				let dataArray;
				if (data) {
					dataArray = Object.entries(data)
				} else {
					dataArray = "";
				}
				setAllBooksData(dataArray)
			})

			setUser(user.uid)
		})
	}, [user])

	useEffect(() => { console.log(allBooksData) }, [])

	return (
		<>
			<header>
				<h1 className={styles.pageTitle}>Estante de Livros</h1>
				<div className={styles.btnWrap}>
					<button
						onClick={() => setAddBook(!addBook)}
					>
						<BsFillPlusSquareFill />Adicionar
					</button>

					<button
						onClick={() => setRemoveBook(!removeBook)}
					>
						<BsXSquareFill />Remover
					</button>
				</div>
			</header>

			<div className={styles.bookWrap}>
				{
					allBooksData ? allBooksData.map((book, index) => (
						<Card
							key={index}
							bookID={book[0]}
							bookData={book[1]}
							updateDB={updateDB}
						/>)) : <p>Não há livros</p>
				}
			</div>

			{
				addBook && <AddBookModal setModal={setAddBook} addToDB={addToDB} />
			}

			{
				removeBook && (
					<RemoveBookModal
						setModal={setRemoveBook}
						removeFromDB={removeFromDB}
						bookOptions={allBooksData} />)
			}
			<span>USER ID: {user}</span>
		</>
	)
}
