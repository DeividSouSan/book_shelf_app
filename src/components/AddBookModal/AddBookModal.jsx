import { useState } from "react"
import propTypes from 'prop-types'
import styles from "./addbookmodal.module.css"
export default function AddBookModal({ setModal, addToDB }) {
    
    const [bookName, setBookName] = useState("")
    const [bookAuthor, setBookAuthor] = useState("")
    const [bookCover, setBookCover] = useState("")

    function handleDrop() {
        setModal(false)
    }

    function handleAdd() {
        const currentBook = ({
            "bookName": bookName,
            "bookAuthor": bookAuthor,
            "bookCover": bookCover
        })
        
        addToDB(currentBook)
        setModal(false)
    }


    return (
        <div className={styles.container} id={"modal"} onClick={(event) => {if (event.target.id === "modal") { setModal(false) }}}>
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
    setModal: propTypes.func,
    addToDB: propTypes.func
}
