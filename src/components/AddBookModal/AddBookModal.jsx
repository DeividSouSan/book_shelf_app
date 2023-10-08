import { useState } from "react"
import propTypes from 'prop-types'
import styles from "./addbookmodal.module.css"
export default function AddBookModal({ setModal, addToDB }) {

    const [title, setTitle] = useState("")
    const [author, setAuthor] = useState("")
    const [cover, setCover] = useState("")
    const [pages, setPages] = useState("")
    const [status, setStatus] = useState("")
    const [currentPage, setCurrentPage] = useState("")

    function handleDrop() {
        setModal(false)
    }

    function handleAdd() {
        const currentBook = ({
            "title": title,
            "author": author,
            "cover": cover,
            "pages": pages,
            "status": status,
            "currentPage": currentPage
        })

        addToDB(currentBook)
        setModal(false)
    }

    return (
        <div
            className={styles.container}
            id={"modal"}
            onClick={(event) => {
                if (event.target.id === "modal") {
                    setModal(false)
                }
            }}>
            <div>
                <h1>Adicione um Livro</h1>
                <form>
                    <label htmlFor="">Titulo do Livro</label>
                    <input
                        type="text"
                        onChange={(e) => setTitle(e.target.value)}
                    />

                    <label htmlFor="">Autor do Livro</label>
                    <input
                        type="text"
                        onChange={(e) => setAuthor(e.target.value)}
                    />

                    <label htmlFor="">Capa do Livro</label>
                    <input
                        type="text"
                        onChange={(e) => setCover(e.target.value)}
                    />

                    <label htmlFor="">Número de Páginas</label>
                    <input
                        type="number"
                        min={0}
                        onChange={(e) => setPages(e.target.value)}
                    />

                    <label htmlFor="">Página Atual</label>
                    <input
                        type="number"
                        min={0}
                        onChange={(e) => setCurrentPage(e.target.value)}
                    />

                    <label htmlFor="">Status de Leitura</label>
                    <select name="" id="" onChange={(e) => setStatus(e.target.value)}>
                        <option value="" selected>Selecione</option>
                        <option value="Start">Começar</option>
                        <option value="Reading">Lendo</option>
                        <option value="Finished">Terminado</option>
                    </select>

                    <div>
                        <button type="button" onClick={handleAdd}>ADICIONAR</button>
                        <button type="button" onClick={handleDrop}>CANCELAR</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

AddBookModal.propTypes = {
    setModal: propTypes.func,
    addToDB: propTypes.func
}
