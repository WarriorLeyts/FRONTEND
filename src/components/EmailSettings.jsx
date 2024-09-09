import React from 'react'
import styles from '../styles/emailSettings.module.css'
export default function EmailSettings() {
  return (
    <form className={styles.emailSettings}>

    <div className={styles.blockSettings}>
        <div className="block-input">
          <label className='input-label'>Новая электронная почта</label>
          <input type="text" name="info" className="input" style={{width: "400px", height: "52px"}}/>
        </div>
        <div className="block-input">
          <label className='input-label'>Пароль для подтвреждения</label>
          <input type="text" name="location" className="input" style={{width: "400px", height: "52px"}}/>
        </div>
    </div>
    <button className="btn-reg" type='submit' style={{width: "180px", height: "52px"}}>Сохранить</button>
  </form>
  )
}
