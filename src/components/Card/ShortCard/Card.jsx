import { useEffect, useState, useRef } from 'react'
import propTypes from 'prop-types'

import ContentEditable from 'react-contenteditable';

import { Database } from '../../../../entity/Database';
import { FirebaseConfig } from '../../../../controller/FirebaseConfig';

import styles from './card.module.css'
import selectedStyle from './selected_card.module.css'

export default function Card({ bookData }) {
    const [shortCard, setshortCard] = useState(true);

    const currentPage = useRef(bookData.currentPage);
    const title = useRef(bookData.title);
    const [status, setStatus] = useState("none")

    function stopLineBreak(e) {
        if (e.key === "Enter") {
            e.preventDefault();
            return false;
        }
    }

    function handleBlur() {
        let newBookData = {
            ...bookData,
            title: title.current,
            currentPage: currentPage.current
        }

        const database = Database(FirebaseConfig)
        database.updateDB(newBookData)
    }

    function toggleCard() {
        setshortCard(!shortCard)
    }

    function color(status) {
        let defaultColors = {
            "start": "#0476D9",
            "reading": "#03A65A",
            "finished": "#F23D3D",
            "none": "purple"
        }

        return defaultColors[status]
    }
    useEffect(() => {
        console.log(status)
    }, [status])

    return (
        <div
            className={shortCard ? styles.bookContainer : selectedStyle.bookContainer}
            onDoubleClick={toggleCard}
        >
            {!shortCard && <img src={bookData.cover} alt="" />}
            <ContentEditable
                html={title.current}
                tagName='h1'
                className={styles.pageCount}
                onKeyDown={(e) => stopLineBreak(e)}
                onChange={(e) => title.current = e.target.value}
                onBlur={handleBlur}
            />
            <div className={styles.infoWrap}>
                <span className={styles.pageCountElement}>
                    <ContentEditable
                        html={currentPage.current}
                        tagName='p'
                        className={styles.pageCount}
                        onKeyDown={(e) => stopLineBreak(e)}
                        onChange={(e) => currentPage.current = e.target.value}
                        onBlur={handleBlur}
                    />/{bookData.pages}
                </span>
                <span className={styles.status}>
                    <select
                        name=""
                        id=""
                        style={{ backgroundColor: color(status) }}
                        onChange={(e) => setStatus(e.target.value)}
                    >
                        <option value="none" style={{ backgroundColor: "purple" }} defaultValue>?</option>
                        <option value="start"  style={{ backgroundColor: "#0476D9" }}>Começar</option>
                        <option value="reading" style={{ backgroundColor: "#03A65A" }}>Lendo</option>
                        <option value="finished" style={{ backgroundColor: "#F23D3D" }}>Terminado</option>
                    </select>
                </span>
            </div>
        </div>
    )
}

Card.propTypes = {
    bookData: propTypes.object,
}