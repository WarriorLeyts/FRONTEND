import React, { useState, useEffect } from 'react'
import styles from '../styles/passwordSettings.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { updatePassword, clearDateProfile } from '@/store/profileSlice'

export default function PasswordSettings() {
  const dispatch = useDispatch();
  const { loading, message, errorsServer} = useSelector((state) => state.profile)
  const [formData, setFormData] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({
    errOldPass: null,
    errNewPass: null,
    errConfirm: null,
  });
  useEffect(() => {
    setErrors((prev) => ({
      ...prev,
      ...errorsServer
    }))
    errors.error && alert(errors.error)
  }, [errorsServer]);

  useEffect(() => {
   if (message) {
    alert(message)
    dispatch(clearDateProfile());
    setFormData({
      oldPassword: '',
      newPassword: '',
      confirmPassword: '',
    });
   }
  }, [message]);


  const handleChange = (event) => {
    const { name, value} = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
    if (name === 'oldPassword') {
      setErrors((prev) => ({
        ...prev,
        errOldPass: false,
      }))
    }
    if (name === 'newPassword') {
      setErrors((prev) => ({
        ...prev,
        errNewPass: false,
      }))
    } 
    if ( name === 'confirmPassword' && value != formData.newPassword) {
      setErrors((prev) => ({
        ...prev,
        errConfirm: 'Пароли не совпадают',
      }))
    } else {
      setErrors((prev) => ({
        ...prev,
        errConfirm: false,
      }))
    }
  }
  const handleSubmit = (event) => {
    event.preventDefault();
    const isEpmty = Object.values(formData).includes('');
    if (errors.errConfirm || isEpmty) {
      return isEpmty && alert('Нет данных для обновления. Заполните все поля.')
    }
    console.log(errors)
    dispatch(updatePassword(formData))
  }
  return (
    <form className={styles.passwordSettings}>

    <div className={styles.blockSettings}>
        <div className="block-input">
          <label className='input-label'>Старый пароль</label>
          <input type="password" name="oldPassword"  value={formData.oldPassword} className={errors.errOldPass ? `${styles.input} input inpError`: `${styles.input} input `} onChange={(event) => handleChange(event)}/>
          <p className='text-valid err-valid' style={{marginBottom: "0px"}}>{errors.errOldPass}</p>
        </div>
        <div className="block-input">
          <label className='input-label'>Новый пароль</label>
          <input type="password" name="newPassword" value={formData.newPassword} className={errors.errNewPass ? `${styles.input} input inpError`: `${styles.input} input `} onChange={(event) => handleChange(event)}/>
          <p className='text-valid err-valid' style={{marginBottom: "0px"}}>{errors.errNewPass}</p>
        </div>
        <div className="block-input">
          <label className='input-label'>новый пароль еще раз</label>
          <input type="password" name="confirmPassword" value={formData.confirmPassword} className={errors.errConfirm ? `${styles.input} input inpError`: `${styles.input} input `} onChange={(event) => handleChange(event)}/>
          <p className='text-valid err-valid' style={{marginBottom: "0px"}}>{errors.errConfirm}</p>
        </div>
    </div>
    {loading ? <div className="loader" style={{marginLeft: "60px"}}></div>
      : <button className="btn-reg" type='submit' style={{width: "180px", height: "52px"}} onClick={(event) => handleSubmit(event)}>Сохранить</button>}
  </form>
  )
}
