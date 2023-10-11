import { useEffect, useState, useRef } from "react"
import Card from "../../components/Card/Card"
import AddBookModal from "../../components/AddBookModal/AddBookModal"
import RemoveBookModal from "../../components/RemoveBookModal/RemoveBookModal"
import { BsXSquareFill, BsFillPlusSquareFill } from 'react-icons/bs'
import styles from "./allbooks.module.css"

import {authenticate, addToDB, removeFromDB, updateDB} from '../../../controller/FirebaseControl.js';

export default function AllBooks() {
	const [allBooksFromCurrentUser, setAllBooksFromCurrentUser] = useState();

	const [addBookModalStatus, setAddBookModalStatus] = useState(false)
	const [removeBookModalStatus, setRemoveBookModalStatus] = useState(false)

	useEffect(() => {
		authenticate().then((data) => {
			setAllBooksFromCurrentUser(data)
		})
	}, [addBookModalStatus, removeBookModalStatus])

	return (
		<>
			<header>
				<h1 className={styles.pageTitle}>Estante de Livros</h1>
				<div className={styles.btnWrap}>
					<button onClick={() => setAddBookModalStatus(!addBookModalStatus)}>
						<BsFillPlusSquareFill />Adicionar
					</button>
					<button onClick={() => setRemoveBookModalStatus(!removeBookModalStatus)}>
						<BsXSquareFill />Remover
					</button>
				</div>
			</header>

			<div className={styles.bookWrap}>
				{
					allBooksFromCurrentUser ? Object.entries(allBooksFromCurrentUser).map((book, index) => (
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
				removeBookModalStatus && <RemoveBookModal
						setModalStatus={setRemoveBookModalStatus}
						removeFromDB={removeFromDB}
						bookOptions={allBooksFromCurrentUser} />
			}
		</>
	)
}
