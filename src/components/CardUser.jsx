import React, { useState } from 'react';
import styles from '../styles/cardUser.module.css';
const CardUser = () => {
    return (
        <div className={styles.cardUser}>
            <div className={styles.userInfoBlock}>
            <div className={styles.avatar}></div>
                <div className={styles.userInfo}>
                  <p className={styles.name}>Александр</p>
                  <span className={styles.email}>@burtovoy</span>
                </div>
            </div>    
                <div className={styles.statistics}>
                    <div className={styles.statistic}>
                      <p className={styles.title}>45K</p>
                      <span className={styles.subTitle}>Сообщений</span>
                    </div>
                    <div className={styles.statistic}>
                      <p className={styles.title}>28</p>
                      <span className={styles.subTitle}>Читаемых</span>
                    </div>
                    <div className={styles.statistic}>
                      <p className={styles.title}>118</p>
                      <span className={styles.subTitle}>Читателей</span>
                    </div>                   
                </div>
        </div>
    );
};
export default CardUser;