import React, { useEffect, useState } from 'react'
import NavbarList from './NavbarList'
import styles from '../styles/FeedPage.module.css';
import { useSelector } from 'react-redux';

export default function Footer({location}) {
  const location1 = location;
  const { userInfo } = useSelector((state) => state.profile);
  const [avatarImg, setAvatarImg] = useState('');
  useEffect(() => {
    setAvatarImg(userInfo?.avatar)
  }, [userInfo])
  return (
    <footer className={styles.footer}>
         <NavbarList location={location1}/> <div className={styles.avatar} style={{backgroundImage: `url(${avatarImg  || ''})`}}></div>
        </footer>
  )
}
