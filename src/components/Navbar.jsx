import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/Navbar.module.css';
const Navbar = () => {
    const [active, setActive] = useState(true);
    return (
        <nav>
            <ul className={styles.navbar}>
                <li>
                    <Link className={active ? styles.navbar_link_act : styles.navbar_link} to="/feed">
                      <img  src="img/home1.svg"/> 
                      <p className={active ? styles.subLinkAct : styles.subLink}>Лента</p>
                    </Link>
                </li>
                <li>
                    <Link to="/profile" className={styles.navbar_link}>
                      <img  src="img/user.svg"/> 
                      <p className={styles.subLink}>Профиль</p>
                    </Link>
                </li>
                <li>
                    <Link to="/settings/profile" className={styles.navbar_link}>
                      <img  src="img/adjust.svg"/> 
                      <p className={styles.subLink}>Настройки</p>
                    </Link>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;