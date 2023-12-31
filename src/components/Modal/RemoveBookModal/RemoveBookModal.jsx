import { useEffect, useState } from "react"
import propTypes from 'prop-types'

import { Database } from '../../../../entity/Database';
import { FirebaseConfig } from '../../../../controller/FirebaseConfig';

import styles from "./removebookmodal.module.css"
export default function RemoveBookModal({ setModalStatus }) {
    const [bookOptions, setBookOptions] = useState(null)
    const [selectedBook, setSelectedBook] = useState("")

    const database = new Database(FirebaseConfig)

    function handleRemove() {
        database.removeFromDB(selectedBook)
        setModalStatus(false)
    }

    useEffect(() => {
        database.readFromDB().then(data => setBookOptions(data))
    }, [])

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
                            <option>Selecionar Livro</option>
                            {
                                bookOptions && Object.entries(bookOptions).map(
                                    (item, index) => (
                                        <option value={item[0]} key={index}>
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
