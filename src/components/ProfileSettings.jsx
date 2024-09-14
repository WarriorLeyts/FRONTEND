import React, { useState, useEffect } from 'react'
import styles from '../styles/profileSettings.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUserInfo, updateUser, clearDateProfile } from '@/store/profileSlice.js'

export default function ProfileSettings() {
  const dispatch = useDispatch();
  const { userInfo, loading, error, message} = useSelector((state) => state.profile);
  const [formData, setFormData] = useState({
    name: '',
    nickname: '',
    avatar: '',
    aboutme: '',
    location: '',
    website: '',
    dateOfBirth: '',
    showBirthDate: '',
  });
  const [apiData, setApiData] = useState('');
  const date = formData.dateOfBirth ? new Date(formData.dateOfBirth) :  new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const formattedDate = `${year}-${month}-${day}`;

  useEffect(() => {
    dispatch((fetchUserInfo()));
  },[])

  useEffect(() => {
   setFormData({
    ...userInfo
   });
  }, [userInfo]);

  useEffect(() => {
    if (message) {
      alert(message)
      dispatch(clearDateProfile())
    }
  }, [message])

  const handleChange = (event) => {
    const {name, value} = event.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }))
    if ((value != userInfo[name])) {
      setApiData(prev => ({
        ...prev,
       [name]: (name == 'nickname') ? value.toLowerCase() : value,  
      }))
    }
    if ((value === userInfo[name])) {
      setApiData(prev => {
        ((prev) => {
          const obj = {
            ...prev
          }
          delete obj[name]
          return obj
        })(prev)
      })
    }

  }
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!apiData) {
     return alert('Нет данных для обновления!')
    }
    return dispatch(updateUser(apiData));
  }
  return (
    <form className={styles.profileSetting}>
    <div className={styles.firstSetting}>
      <div className={styles.inputs}>
        <div className="block-input">
          <label className='input-label'>Ваше имя</label>
          <input type="name" name="name" className='input' value={formData.name || ''} onChange={(event) => handleChange(event)}/>
        </div>
        <div className="block-input">
          <label className='input-label'>Никнейм</label>
          <input type="text" name="nickname" className='input' value={formData.nickname || ''} onChange={(event) => handleChange(event)}/>
        <p className='text-valid err-valid'>{error}</p>
        </div>
        </div>
        <div className={styles.avatar} style={{backgroundImage: `url(${formData.avatar || ''})`}}> 
          <svg width="25" height="21" viewBox="0 0 25 21" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M15.8162 12.3526C15.8162 14.2725 14.3326 15.8266 12.5 15.8266C10.6674 15.8266 9.18378 14.2725 9.18378 12.3526C9.18378 10.4328 10.6674 8.87862 12.5 8.87862C14.3326 8.87862 15.8162 10.4328 15.8162 12.3526ZM22.6027 3.6461C23.9271 3.6461 25 4.77004 25 6.15749V12.7398V18.3219C25 19.8008 23.8552 21 22.4435 21H2.55647C1.14476 21 0 19.8008 0 18.3219V12.7344V6.15749C0 4.77004 1.0729 3.6461 2.39733 3.6461H7.19199L7.41786 2.64584C7.76181 1.09705 9.08111 0 10.6006 0H14.4045C15.924 0 17.2433 1.09705 17.5873 2.64584L17.808 3.6461H22.6027ZM5 7.27068C5 6.57695 4.46099 6.01229 3.79877 6.01229C3.13142 6.01229 2.5924 6.57695 2.5924 7.27068C2.5924 7.9644 3.13142 8.52907 3.79363 8.52907C4.46099 8.53444 5 7.96978 5 7.27068ZM18.4138 12.3526C18.4138 8.9324 15.7649 6.15749 12.5 6.15749C9.23511 6.15749 6.58624 8.9324 6.58624 12.3526C6.58624 15.7729 9.23511 18.5478 12.5 18.5478C15.7649 18.5478 18.4138 15.7729 18.4138 12.3526Z" fill="white"/>
          </svg>
        </div>
      </div>
    <div className={styles.secondSetting}>
        <div className="block-input">
          <label className='input-label'>О себе</label>
          <textarea type="text" name="aboutme" className={`${styles.inputTextArea} input`} value={formData.aboutme}  onChange={(event) => handleChange(event)}/>
        </div>
        <div className="block-input">
          <label className='input-label'>Геолокация</label>
          <input type="text" name="location" className='input' value={formData.location || ''}  onChange={(event) => handleChange(event)}/>
        </div>
        <div className="block-input">
          <label className='input-label'>Веб-сайт</label>
          <input type="text" name="website" className='input' value={formData.website || ''}  onChange={(event) => handleChange(event)}/>
        </div>
        
    </div>
    <div className={styles.thirdSetting}>
      <div className="block-input">
          <label className='input-label'>День рожденья</label>
          <input type="date" name="dateOfBirth" className='input' value={formattedDate || ''}  onChange={(event) => handleChange(event)}/>
        </div>
      <div className="block-input">
      <label className='input-label'>Показывать дату рождения</label>  
      <select className="input" name='showBirthDate' value={formData.showBirthDate || ''} onChange={(event) => handleChange(event)}>
       <option value="showAll">Показывать всем</option>
       <option value="showSubscribers">Показывать только подписчикам</option>
       <option value="showNone">Никому не показывать</option>
      </select>
      </div>
    </div>
    {loading ? <div className="loader" style={{marginLeft: "60px"}}></div>
      : <button className="btn-reg" type='submit' style={{width: "180px", height: "52px"}} onClick={(event) => handleSubmit(event)}>Сохранить</button>}
  </form>
  )
}
