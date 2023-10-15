import { useEffect, useState } from "react"
import Card from "../../components/Card/ShortCard/Card"

import AddBookModal from "../../components/Modal/AddBookModal/AddBookModal"
import RemoveBookModal from "../../components/Modal/RemoveBookModal/RemoveBookModal"

import { BsXSquareFill, BsFillPlusSquareFill } from 'react-icons/bs'
import styles from "./home.module.css"

import { authenticate, readFromDB } from '../../../controller/FirebaseControl.js';

export default function Home() {
	const [allBooksFromCurrentUser, setAllBooksFromCurrentUser] = useState();

	const [addBookModalStatus, setAddBookModalStatus] = useState(false)
	const [removeBookModalStatus, setRemoveBookModalStatus] = useState(false)

	useEffect(() => {
		authenticate().then((data) => {
			setAllBooksFromCurrentUser(data)
		})
	}, [])

	useEffect(() => {
		readFromDB().then(data => setAllBooksFromCurrentUser(data))
	}, [addBookModalStatus, removeBookModalStatus]);

	const OpenAddModal = () => setAddBookModalStatus(!addBookModalStatus)
	const OpenRemoveModal = () => setRemoveBookModalStatus(!removeBookModalStatus)
	return (
		<>
			<header>
				<h1 className={styles.pageTitle}>Estante de Livros</h1>
				<div className={styles.btnWrap}>
					{addBookModalStatus && <AddBookModal setModalStatus={setAddBookModalStatus}/>}
					<button onClick={OpenAddModal}><BsFillPlusSquareFill />Adicionar</button>
					{removeBookModalStatus && <RemoveBookModal setModalStatus={setRemoveBookModalStatus}/>}
					<button onClick={OpenRemoveModal}><BsXSquareFill />Remover</button>
				</div>
			</header>

			<div className={styles.bookWrap}>
				{
					allBooksFromCurrentUser ? Object.entries(allBooksFromCurrentUser).map((book) => (
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
