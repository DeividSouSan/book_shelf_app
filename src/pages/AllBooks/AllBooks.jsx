import { useEffect, useState } from "react"
import Card from "../../components/Card/Card"
import AddBookModal from "../../components/AddBookModal/AddBookModal"
import { BsXSquareFill, BsFillPlusSquareFill } from 'react-icons/bs'
import styles from "./allbooks.module.css"
import RemoveBookModal from "../../components/RemoveBookModal/RemoveBookModal"

export default function AllBooks() {
	const baseURL = "http://127.0.0.1:5000"

	const [bookInfo, setBookInfo] = useState([])
	const [addBook, setAddBook] = useState(false)
	const [removeBook, setRemoveBook] = useState(false)

	useEffect(() => {
		fetch(`${baseURL}/books`)
			.then(response => response.json())
			.then(data => setBookInfo(data))
	}, [bookInfo])

	return (
		<>
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
			<hr />
			<div className={styles.bookWrap}>
				{
					Object.values(bookInfo).map(
						(item, index) => (<Card
							key={index}
							coverURL={item.cover}
							title={item.title}
							id={item.id}
						/>
						)
					)
				}
			</div>

			<hr />
			{
				addBook && <AddBookModal setModal={setAddBook} baseURL={baseURL} />
			}

			{
				removeBook && <RemoveBookModal setModal={setRemoveBook} bookOptions={bookInfo} baseURL={baseURL} />
			}
		</>
	)
}
