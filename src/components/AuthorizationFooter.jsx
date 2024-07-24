import styles from '@/styles/AuthorizationFooter.module.css';
import { useState } from 'react'
import usemodalActive from '@/store/modal.js';

const AuthorizationFooter = () => {
    const setRegModalActive = usemodalActive ((state) => state.setRegModalActive);
    const setAuthorModalActive = usemodalActive ((state) => state.setAuthorModalActive);
    return (
    <section className={styles.authorizationFooter}>  
        <div className={styles.authorization}>
            <h1 className={styles.authorization__title}> Зарегистрируйтесь и узнайте обо всём первым</h1>
            <div className={styles.authorization__block}>
                <button className={styles.authorization__btn} onClick={() => setRegModalActive()}>Зарегистрироваться</button>
                <button className={styles.authorization__btn} onClick={() => setAuthorModalActive()}>Войти</button>
            </div>
        </div>
    </section>
    )
}
export default AuthorizationFooter;