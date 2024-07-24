import styles from '@/styles/AuthorizationFooter.module.css';
import { useState } from 'react'
//import { useFetchStore } from '@/store/fetch.js';

const AuthorizationFooter = () => {
    const [modalActive, setModalActive] = useState(true)
    return (
    <section className={styles.authorizationFooter}>  
        <div className={styles.authorization}>
            <h1 className={styles.authorization__title}> Зарегистрируйтесь и узнайте обо всём первым</h1>
            <div className={styles.authorization__block}>
                <button className={styles.authorization__btn}>Зарегистрироваться</button>
                <button className={styles.authorization__btn}>Войти</button>
            </div>
        </div>
    </section>
    )
}
export default AuthorizationFooter;