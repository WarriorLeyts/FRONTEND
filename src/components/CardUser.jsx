import styles from '../styles/cardUser.module.css';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserInfo, clearDateProfile } from '@/store/profileSlice.js';

const CardUser = () => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.profile);
  useEffect(() => {
    dispatch(fetchUserInfo())
    console.log(userInfo)
  }, [])
    return (
        <div className={styles.cardUser}>
            <div className={styles.userInfoBlock}>
            <div className={styles.avatar} style={{backgroundImage: `url(${userInfo?.avatar || ''})`}}></div>
                <div className={styles.userInfo}>
                  <p className={styles.name}>{userInfo.name}</p>
                  <span className={styles.nickname}>{userInfo.nickname}</span>
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