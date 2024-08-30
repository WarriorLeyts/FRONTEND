import React from 'react'
import NavbarList from './NavbarList'
import styles from '../styles/FeedPage.module.css';

export default function Footer({location}) {
  const location1 = location
  return (
    <footer className={styles.footer}>
         <NavbarList location={location1}/> <img className={styles.avatar}src='../../public/img/alexsandr-avatar.png'/>
        </footer>
  )
}
