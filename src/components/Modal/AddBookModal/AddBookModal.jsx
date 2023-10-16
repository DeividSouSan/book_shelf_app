import { useRef, useEffect } from "react"
import propTypes from 'prop-types'

import { Database } from '../../../../entity/Database';
import { FirebaseConfig } from "../../../../controller/FirebaseConfig";

import styles from "./addbookmodal.module.css"
export default function AddBookModal({ setModalStatus }) {
	const titleInputRef = useRef(null)

	const bookData = useRef({
		"title": "",
		"author": "",
		"cover": "",
		"pages": "",
		"currentPage": "0",
		"status": ""
	})

	function handleAdd() {
		const currentBook = ({
			...bookData.current
		})

		const database = new Database(FirebaseConfig)
        database.addToDB(currentBook)
		
		setModalStatus(false)
	}

	useEffect(() => {
		titleInputRef.current.focus();
	}, [])

	return (
		<div
			className={styles.container}
			id={"modal"}
			onClick={(event) => { if (event.target.id === "modal") setModalStatus(false) }}
		>
			<div>
				<h1>Adicionar Livro</h1>
				<form>
					<div>
						<label htmlFor="" >Titulo</label>
						<input
							type="text"
							onChange={(e) => { bookData.current.title = e.target.value }}
							ref={titleInputRef}
						/>
					</div>

					<div>
						<label htmlFor="">Autor</label>
						<input
							type="text"
							onChange={(e) => { bookData.current.author = e.target.value }}
						/>
					</div>

					<div>
						<label htmlFor="">Capa URL</label>
						<input
							type="text"
							onChange={(e) => { bookData.current.cover = e.target.value }}
						/>
					</div>

					<div>
						<label htmlFor="">Número de Páginas</label>
						<input
							type="number"
							min={0}
							onChange={(e) => { bookData.current.pages = e.target.value }}
						/>
					</div>

					<div>
						<label htmlFor="">Status de Leitura</label>
						<select name="" id="" onChange={(e) => { bookData.current.status = e.target.value }}>
							<option value="" defaultValue>Selecione</option>
							<option value="start">Começar</option>
							<option value="reading">Lendo</option>
							<option value="finished">Terminado</option>
						</select>
					</div>
					

					<div className={styles.buttonWrap}>
						<button type="button" onClick={handleAdd}>ADICIONAR</button>
						<button type="button" onClick={() => { setModalStatus(false) }}>CANCELAR</button>
					</div>
				</form>
			</div>
		</div>
	)
}

AddBookModal.propTypes = {
	setModalStatus: propTypes.func,
	addToDB: propTypes.func
}
