import { useEffect, useState } from "react"
import PropTypes from 'prop-types'
import styles from "../Select/select.module.css"

export default function Select({defaultOption, options, children}) {
    const [showOptions, setShowOptions] = useState(false)

    useEffect(() => {
        console.log({showOptions})
    }, [showOptions])
    return (
        <div>
            <span
                className={styles.defaultOption}
                onClick={() => setShowOptions(!showOptions)}
            >
                {defaultOption}
            </span>
            {showOptions && children}
        </div>
    )
}

Select.propTypes = {
    defaultOption: PropTypes.string,
    options: PropTypes.array,
}