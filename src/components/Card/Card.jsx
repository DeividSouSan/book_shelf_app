import propTypes from 'prop-types'

import styles from './card.module.css'

export default function Card({ coverURL, title}) {
    return (
        <div className={styles.bookContainer}>
            <div className={styles.bannerContainer}>
                <img src={coverURL} alt="" />
            </div>
            <p>{title}</p>
        </div>
    )
}

Card.propTypes = {
    coverURL: propTypes.string,
    title: propTypes.string,
}