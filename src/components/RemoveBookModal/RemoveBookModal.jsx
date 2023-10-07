import { useEffect, useState } from "react"
import propTypes from 'prop-types'
import styles from "./removebookmodal.module.css"

export default function RemoveBookModal({ setModal, removeFromDB, bookOptions }) {
    const [select_book, set_selected_book] = useState("")

    function handleCancel() {
        setModal(false)
    }

    function handleChange(event) {
        set_selected_book(event.target.value)
    }

    function handleRemove() {
        removeFromDB(select_book)
        setModal(false)
    }

    useEffect(() => {
        console.log(select_book)
    }, [select_book])

    return (
        <div className={styles.container} id={"modal"} onClick={(event) => { if (event.target.id === 'modal') {setModal(false)}}}>
            <div>
                <h1>Remova um Livro</h1>
                <form>
                    <label htmlFor="">Nome do Livro</label>
                    <select value={select_book} onChange={handleChange}>
                        <option>
                            Selecionar Livro
                        </option>
                        {
                            bookOptions.map(
                                (item, index) => (
                                    <option
                                        value={item[0]}
                                        key={index}
                                    >
                                        {item[1].bookName}
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
    removeFromDB: propTypes.func,
    bookOptions: propTypes.array,
}
