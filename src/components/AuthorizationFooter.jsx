import styles from '@/styles/AuthorizationFooter.module.css';

const AuthorizationFooter = ({ setActive }) => {
    return (
    <section className={styles.authorizationFooter}>  
        <div className={styles.authorization}>
            <h1 className={styles.authorization__title}> Зарегистрируйтесь и узнайте обо всём первым</h1>
            <div className={styles.authorization__block}>
                <button className={styles.authorization__btn} onClick={() => setActive('reg')}>Зарегистрироваться</button>
                <button className={styles.authorization__btn} onClick={() => setActive('auth')}>Войти</button>
            </div>
        </div>
    </section>
    )
}
export default AuthorizationFooter;