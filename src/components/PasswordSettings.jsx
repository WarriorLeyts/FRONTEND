import React from 'react'
import styles from '../styles/passwordSettings.module.css'
export default function PasswordSettings() {
  return (
    <form className={styles.passwordSettings}>

    <div className={styles.blockSettings}>
        <div className="block-input">
          <label className='input-label'>Старый пароль</label>
          <input type="password" name="info" className="input" style={{width: "400px", height: "52px"}}/>
        </div>
        <div className="block-input">
          <label className='input-label'>Новый пароль</label>
          <input type="password" name="location" className="input" style={{width: "400px", height: "52px"}}/>
        </div>
        <div className="block-input">
          <label className='input-label'>новый пароль еще раз</label>
          <input type="password" name="location" className="input" style={{width: "400px", height: "52px"}}/>
        </div>
    </div>
    <button className="btn-reg" type='submit' style={{width: "180px", height: "52px"}}>Сохранить</button>
  </form>
  )
}
