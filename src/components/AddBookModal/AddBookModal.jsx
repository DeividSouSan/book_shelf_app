import { useState } from "react"
import propTypes from 'prop-types'
import styles from "./addbookmodal.module.css"

export default function AddBookModal({ setModal }) {
    const [bookName, setBookName] = useState()
    const [bookAuthor, setBookAuthor] = useState()
    const [bookCover, setBookCover] = useState()

    function handleDrop() {
        setModal(false)
    }

    function handleAdd() {
        let bookData = {
            "title": bookName,
            "author": bookAuthor,
            "cover": bookCover
        }

        const config = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(bookData)
        }

        fetch("http://127.0.0.1:5000/books", config)

        setModal(false)
    }

    return (
        <div className={styles.container}>
            <div>
                <h1>Adicione um Livro</h1>
                <form>
                    <label htmlFor="">Nome do Livro</label>
                    <input
                        type="text"
                        name=""
                        id=""
                        onChange={(e) => setBookName(e.target.value)}
                    />

                    <label htmlFor="">Autor do Livro</label>
                    <input
                        type="text"
                        name=""
                        id=""
                        onChange={(e) => setBookAuthor(e.target.value)}
                    />

                    <label htmlFor="">Capa do Livro</label>
                    <input
                        type="text"
                        name=""
                        id=""
                        onChange={(e) => setBookCover(e.target.value)}
                    />

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
    setModal: propTypes.func
}
