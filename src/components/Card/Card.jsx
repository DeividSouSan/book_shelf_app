import propTypes from 'prop-types'
import ContentEditable from 'react-contenteditable';
import styles from './card.module.css'
import { useEffect, useState, useRef } from 'react'

export default function Card({ coverURL, bookData }) {
    const [color, setColor] = useState('');
    const [selected, setSelected] = useState(true)
    const text = useRef('')

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
                <h1>{bookData.title}</h1>
                <div className={styles.infoWrap}>
                    <span className={styles.pageCountElement}>
                        <ContentEditable
                            html={text.current}
                            tagName='p' // Use a custom HTML tag (uses a div by default)
                            className={styles.pageCount}
                            onKeyDown={(e) => handlePress(e)}
                        />

                        /{bookData.pages}
                    </span>
                    <span style={{ backgroundColor: color }} className={styles.status}>
                        {bookData.status}
                    </span>
                </div>

            </div >
        )
    }

    function expandedCard() {
        return (
            <div className={styles.bookContainer} onDoubleClick={toggleCard}>
                <div>
                    <img src={coverURL} alt="" className={styles.bannerContainer} />
                </div>
                <h1>{title}</h1>
                {currentPage}/{pages}
                <span style={{ backgroundColor: color }} className={styles.forme}>
                    {status}
                </span>
            </div>
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
    coverURL: propTypes.string,
    bookData: propTypes.object
}