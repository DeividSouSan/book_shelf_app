import styles from "../Header/header.modules.css"

export default function Header({setAddBookModalStatus, setRemoveBookModalStatus}) {
    const 
    return(
        <header>
				<h1 className={styles.pageTitle}>Estante de Livros</h1>
				<div className={styles.btnWrap}>
					<button onClick={() => setAddBookModalStatus(!addBookModalStatus)}>
						<BsFillPlusSquareFill />Adicionar
					</button>
					<button onClick={() => setRemoveBookModalStatus(!removeBookModalStatus)}>
						<BsXSquareFill />Remover
					</button>
				</div>
			</header>
    )
}