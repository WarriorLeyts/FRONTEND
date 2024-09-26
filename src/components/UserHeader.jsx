import React, { useEffect, useState} from 'react';
import styles from '../styles/UserHeader.module.css';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function UserHeader() {
    const navigate = useNavigate();
    const { userInfo } = useSelector((state) => state.profile);
    const [userDate, setUserDate] = useState({
        name: '',
        nickname: '',
        aboutme: '',
        location: '',
        website: '',
        dateOfBirth: '',
        showBirthDate: '',
        avatar: '',
    })
    useEffect(() => {
      setUserDate({
        ...userInfo
      })
    }, [userInfo])
    const birthDate = new Date(userDate.dateOfBirth);
    const day = birthDate.getDate();
    const month = birthDate.getMonth();
    const monthsGenitive = [
        "января", "февраля", "марта", "апреля", "мая", "июня",
        "июля", "августа", "сентября", "октября", "ноября", "декабря"
    ];
    
  return (
    <div className={styles.userHeader}>
        <div className={styles.userInfo}>
            <div className={styles.avatar} style={{backgroundImage: `url(${userDate.avatar || ''})`}}></div>
            <p className={styles.name}>{userDate.name}</p>
            <span className={styles.nickname}>{userDate.nickname}</span>
            <p className={styles.aboutme}>{userDate.aboutme}</p>
            <ul className={styles.descriptions}>
                <li> <img src="../img/location.svg" alt="локация"/>{userDate.location}</li>
                <li> <img src="../img/link.svg" alt="ссылка"/><a href={userDate.website}>{userDate.website}</a></li>
                <li> <img src="../img/calendar.svg" alt="календарь"/>{userDate.showBirthDate === 'showAll' && `День рождения ${day} ${monthsGenitive[month]}`}</li>
            </ul>
            <div className={styles.footer}>
                <ul className={styles.statistics}>
                    <li><p>45K</p><span>Сообщений</span></li>
                    <li><p>28</p><span>Читаемых</span></li>
                    <li><p>118</p><span>Читателей</span></li>
                </ul>
                <button className={`${styles.btn} btn-reg`} onClick={() => navigate('/settings/profile')}>Редактировать профиль</button>
            </div>
        </div>
    </div>
  )
}
