import { useRef } from "react"
import propTypes from 'prop-types'
import styles from "./addbookmodal.module.css"
export default function AddBookModal({ setModalStatus, addToDB }) {
	const title = useRef("")
	const author = useRef("")
	const cover = useRef("")
	const pages = useRef("")
	const status = useRef("")

	function handleAdd() {
		const currentBook = ({
			"title": title.current,
			"author": author.current,
			"cover": cover.current,
			"pages": pages.current,
			"currentPage": "0",
			"status": status.current,
		})

		addToDB(currentBook)
		setModalStatus(false)
	}

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
						<label htmlFor="">Titulo</label>
						<input
							type="text"
							onChange={(e) => { title.current = e.target.value }}
						/>
					</div>

					<div>
						<label htmlFor="">Autor</label>
						<input
							type="text"
							onChange={(e) => { author.current = e.target.value }}
						/>
					</div>

					<div>
						<label htmlFor="">Capa URL</label>
						<input
							type="text"
							onChange={(e) => { cover.current = e.target.value }}
						/>
					</div>

					<div>
						<label htmlFor="">Número de Páginas</label>
						<input
							type="number"
							min={0}
							onChange={(e) => { pages.current = e.target.value }}
						/>
					</div>

					<div>
						<label htmlFor="">Status de Leitura</label>
						<select name="" id="" onChange={(e) => { status.current = e.target.value }}>
							<option value="" defaultValue>Selecione</option>
							<option value="Start">Começar</option>
							<option value="Reading">Lendo</option>
							<option value="Finished">Terminado</option>
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
