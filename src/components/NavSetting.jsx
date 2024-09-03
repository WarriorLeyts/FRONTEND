import React from 'react';
import styles from '@/styles/navSetting.module.css';
import { Link } from 'react-router-dom';

export default function NavSetting({ location }) {
  return (
    <div className={styles.navSetting}>
      <h2 className={styles.navSetting__title}>Настройки</h2>
      <div className={styles.navSetting__items}>
        <Link className={location === '/settings/profile' ? `${styles.navSettingItem} ${styles.navSettingItemAct}` : styles.navSettingItem}  to="/settings/profile">Настройки профиля</Link>
        <Link className={location === '/settings/password' ? `${styles.navSettingItem} ${styles.navSettingItemAct}` : styles.navSettingItem} to="/settings/password">Сменить пароль</Link>
        <Link className={location === '/settings/email' ? `${styles.navSettingItem} ${styles.navSettingItemAct}` : styles.navSettingItem} to="/settings/email">Сменить e-mail</Link>
      </div>
    </div>
  )
}
