import { useEffect, useState } from "react"
import propTypes from 'prop-types'
import styles from "./removebookmodal.module.css"

export default function RemoveBookModal({ setModal, bookOptions }) {
    const [select_book, set_selected_book] = useState("")

    function handleCancel() {
        setModal(false)
    }

    function handleChange(event) {
        set_selected_book(event.target.value)
    }

    function handleRemove() {
        const config = {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify()
        }

        fetch(`http://127.0.0.1:5000/books/${select_book}`, config)

        setModal(false)
    }

    async function fixIndex() {
        const config = {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"

            },
            body: JSON.stringify()
        }

        let response = await fetch('http://127.0.0.1:5000/books', config)
        return response
    }
    useEffect(() => {
        fixIndex()
    }, [setModal])
    return (
        <div className={styles.container}>
            <div>
                <h1>Remova um Livro</h1>
                <form>
                    <label htmlFor="">Nome do Livro</label>
                    <select value={select_book} onChange={handleChange}>
                        <option>
                            selecionar
                        </option>
                        {
                            Object.values(bookOptions).map(
                                (item, index) => (
                                    <option
                                        value={index + 1}
                                        key={index}
                                    >
                                        {item.title}
                                    </option>)
                            )
                        }
                    </select>

                    <div>
                        <button type="button" onClick={handleRemove}>REMOVER</button>
                        <button type="button" onClick={handleCancel}>CANCELAR</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

RemoveBookModal.propTypes = {
    setModal: propTypes.func,
    bookOptions: propTypes.object
}
