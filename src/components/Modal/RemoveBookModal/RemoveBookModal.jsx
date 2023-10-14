import { useState } from "react"
import propTypes from 'prop-types'
import styles from "./removebookmodal.module.css"
import { removeFromDB } from '../../../../controller/FirebaseControl.js';
export default function RemoveBookModal({ setModalStatus, bookOptions }) {
    const [selectedBook, setSelectedBook] = useState("")

    function handleRemove() {
        removeFromDB(selectedBook)
        setModalStatus(false)
    }

    return (
        <div
            className={styles.container}
            id={"modal"}
            onClick={(e) => { if (e.target.id === 'modal') setModalStatus(false) }}>
            <div>
                <h1>Remova um Livro</h1>
                <form>
                    <div>
                        <label htmlFor="">Nome do Livro</label>
                        <select value={selectedBook} onChange={(e) => setSelectedBook(e.target.value)}>
                            <option>
                                Selecionar Livro
                            </option>
                            {
                                bookOptions && Object.entries(bookOptions).map(
                                    (item, index) => (
                                        <option
                                            value={item[0]}
                                            key={index}
                                        >
                                            {item[1].title}
                                        </option>)
                                )
                            }
                        </select>
                    </div>

                    <div className={styles.buttonWrap}>
                        <button type="button" onClick={handleRemove}>REMOVER</button>
                        <button type="button" onClick={() => setModalStatus(false)}>CANCELAR</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

RemoveBookModal.propTypes = {
    setModalStatus: propTypes.func,
    removeFromDB: propTypes.func,
    bookOptions: propTypes.object,
}
