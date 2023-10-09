import { useEffect, useState } from "react"
import Card from "../../components/Card/Card"
import AddBookModal from "../../components/AddBookModal/AddBookModal"
import RemoveBookModal from "../../components/RemoveBookModal/RemoveBookModal"
import { BsXSquareFill, BsFillPlusSquareFill } from 'react-icons/bs'

import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js';
import { getDatabase, ref, push, onValue, remove } from 'https://www.gstatic.com/firebasejs/10.4.0/firebase-database.js'
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

	const books = ref(database, `${user}/books`)
	const auth = getAuth();


	const [addBook, setAddBook] = useState(false)
	const [removeBook, setRemoveBook] = useState(false)

	const [allBooksData, setAllBooksData] = useState([]);

	function addToDB(currentBookInfo) {
		push(books, currentBookInfo)
	}

	function removeFromDB(bookId) {
		const bookLoc = ref(database, `${user}/books/${bookId}`)
		remove(bookLoc)
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

	useEffect(() => {console.log(allBooksData)}, [])

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

			<span>USER ID: {user}</span>
			<div className={styles.bookWrap}>
				{
					allBooksData ? allBooksData.map((book, index) => (
						<Card
							key={index}
							bookData={book[1]}
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
		</>
	)
}
