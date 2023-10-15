import { useEffect, useState } from "react"

import Card from "../../components/Card/ShortCard/Card"
import AddBookModal from "../../components/Modal/AddBookModal/AddBookModal"
import RemoveBookModal from "../../components/Modal/RemoveBookModal/RemoveBookModal"

import { BsXSquareFill, BsFillPlusSquareFill } from 'react-icons/bs'
import styles from "./home.module.css"

import { Database } from "../../../entity/Database.js"
import { FirebaseConfig } from "../../../controller/FirebaseConfig.js"

export default function Home() {
	const database = new Database(FirebaseConfig)

	const [booksFromUser, setBooksFromUser] = useState();

	const [addBookModalStatus, setAddBookModalStatus] = useState(false)
	const [removeBookModalStatus, setRemoveBookModalStatus] = useState(false)

	const OpenAddModal = () => setAddBookModalStatus(!addBookModalStatus)
	const OpenRemoveModal = () => setRemoveBookModalStatus(!removeBookModalStatus)

	useEffect(() => {
		database.readFromDB().then(data => setBooksFromUser(data))
	}, [addBookModalStatus, removeBookModalStatus])

	return (
		<>
			<header>
				<h1 className={styles.pageTitle}>Estante de Livros</h1>
				<div className={styles.btnWrap}>
					{addBookModalStatus && <AddBookModal setModalStatus={setAddBookModalStatus} />}
					<button onClick={OpenAddModal}><BsFillPlusSquareFill />Adicionar</button>
					{removeBookModalStatus && <RemoveBookModal setModalStatus={setRemoveBookModalStatus} />}
					<button onClick={OpenRemoveModal}><BsXSquareFill />Remover</button>
				</div>
			</header>

			<div className={styles.bookWrap}>
				{
					booksFromUser ? Object.entries(booksFromUser).map((book) => (
						<Card
							key={book[0]}
							bookID={book[0]} /* [id] */
							bookData={book[1]} /* [properties] */
						/>)) : <p>Não há livros</p>

				}
			</div>
		</>
	)
}
