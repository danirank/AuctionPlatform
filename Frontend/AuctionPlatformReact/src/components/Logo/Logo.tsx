import style from './Logo.module.css'

function Logo() {
    return(
        <>
        <img className={style.logo} src="/src/assets/pageIcon.png" alt="Logo" />
        </>
    )

}

export default Logo;