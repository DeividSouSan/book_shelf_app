import propTypes from 'prop-types'
import ContentEditable from 'react-contenteditable';
import styles from './card.module.css'
import { useEffect, useState, useRef } from 'react'

export default function Card({ bookData }) {
    const [color, setColor] = useState('');
    const [selected, setSelected] = useState(true)
    const currentPage = useRef("0")
    const bookTitle = useRef(bookData.title)
    function handlePress(e) {
        if (e.key === "Enter") {
            e.preventDefault();
            return false;
        }
    }

    function toggleCard() {
        setSelected(!selected)
    }

    function baseCard() {
        return (
            <div className={styles.bookContainer} onDoubleClick={toggleCard}>
                <ContentEditable
                            html={bookTitle.current}
                            tagName='h1'
                            className={styles.pageCount}
                            onKeyDown={(e) => handlePress(e)}
                        />
                <div className={styles.infoWrap}>
                    <span className={styles.pageCountElement}>
                        <ContentEditable
                            html={currentPage.current}
                            tagName='p'
                            className={styles.pageCount}
                            onKeyDown={(e) => handlePress(e)}
                        />

                        /{bookData.pages}
                    </span>
                    <span className={styles.status}>
                        <select name="" id="" style={{ backgroundColor: color }}>
                            <option value="">Terminado</option>
                            <option value="">Lendo</option>
                            <option value="">Começar</option>
                        </select>
                    </span>
                </div>

            </div >
        )
    }

    function expandedCard() {
        return (
            <div className={styles.bookContainer} onDoubleClick={toggleCard}>
                <div className={styles.coverWrap} >
                    <img src={bookData.cover} alt="" />
                </div>
                <h1>{bookData.title}</h1>
                {bookData.currentPage} /{bookData.pages}
                <span span style={{ backgroundColor: color }} className={styles.forme} >
                    {bookData.status}
                </span>
            </div >
        )
    }

    useEffect(() => {
        switch (bookData.status) {
            case 'Start':
                setColor('#E50D4E');
                break
            case 'Reading':
                setColor('#6098D1');
                break
            case 'Finished':
                setColor('#648B56');
                break
        }
    }, [bookData.status])

    return (
        <>
            {
                selected ? baseCard() : expandedCard()
            }
        </>

    )
}

Card.propTypes = {
    bookData: propTypes.object
}