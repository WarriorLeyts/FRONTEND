import styles from '../styles/cardUser.module.css';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const CardUser = () => {
  const { userInfo } = useSelector((state) => state.profile);
  const [userDate, setUserDate] = useState({
    avatar: '',
    name: '',
    nickname: '',
  })
  useEffect(() => {
    setUserDate({
      ...userInfo
    })
  }, [userInfo])
    return (
        <div className={styles.cardUser}>
            <div className={styles.userInfoBlock}>
            <div className={styles.avatar} style={{backgroundImage: `url(${userDate.avatar || ''})`}}></div>
                <div className={styles.userInfo}>
                  <p className={styles.name}>{userDate.name}</p>
                  <span className={styles.nickname}>{userDate.nickname}</span>
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