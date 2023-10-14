import propTypes from 'prop-types'
import ContentEditable from 'react-contenteditable';
import styles from './card.module.css'
import selectedStyle from './selected_card.module.css'
import { useEffect, useState, useRef } from 'react'
import { updateDB } from '../../../../controller/FirebaseControl.js';

export default function Card({ bookID, bookData }) {
    const [color, setColor] = useState('');
    const [shortCard, setshortCard] = useState(true);

    const currentPage = useRef(bookData.currentPage);
    const title = useRef(bookData.title);

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

        updateDB(bookID, newBookData)
    }

    function toggleCard() {
        setshortCard(!shortCard)
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
        <div
            className={shortCard ? styles.bookContainer : selectedStyle.bookContainer}
            onDoubleClick={toggleCard}
        >
            {!shortCard && (
                <img src={bookData.cover} alt="" />
            )}
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
                    <select name="" id="" style={{ backgroundColor: color }}>
                        <option value="">Terminado</option>
                        <option value="">Lendo</option>
                        <option value="">Começar</option>
                    </select>
                </span>
            </div>
        </div>
    )
}

Card.propTypes = {
    bookID: propTypes.string,
    bookData: propTypes.object,
    updateDB: propTypes.func
}