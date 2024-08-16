import '@/styles/RegModal.css';
import usemodalActive from '@/store/modal.js';
import emailValidation from '@/email_validation.js';
import React, { useState } from "react";
import useFetchStore from '@/store/fetch.js';

const RegModal = () => {
    const [formData, setFormData] = useState({
        name: "", 
        email: "", 
        password: "", 
        confirmPassword: ""
    })
    const active = usemodalActive ((state) => state.regModalActive);
    const setActive = usemodalActive ((state) => state.setRegModalActive);
    const [nameDirty, setNameDirty] = useState(false);
    const [emailDirty, setEmailDirty] = useState(false);
    const [passwordDirty, setPasswordDirty] = useState(false);
    const [confirmDirty, setConfirmDirty] = useState(false);
    const [isButton, setIsButton] = useState(false);
    const newUser = useFetchStore ((state) => state.newUser);
    const setNewUser = useFetchStore ((state) => state.setNewUser);
      const handleError = (name, value) => {
        switch (name) {
            case 'name':
              if (value === '') {
                setNameDirty(true)
              } else {
                setNameDirty(false)
              }
              break;
            case 'email':
              if ((value === '') || (!emailValidation(value))) {
                  setEmailDirty(true)
                } else {
                  setEmailDirty(false)
                }
                break;
            case 'password':
              if (value === '') {
                    setPasswordDirty(true)
                } else {
                    setPasswordDirty(false)
            }
            case 'confirmPassword':
                if (value !== formData.password) {
                    setConfirmDirty(true)
                  } else {
                    setConfirmDirty(false)
              }
            break;                   
          }
      }
      const handleChange = (event) => {
        const {name, value} = event.target
        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: value
        }))
      handleError(name, value)
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        handleError('name', formData.name);
        handleError('email', formData.email);
        handleError('password', formData.password);
        handleError('confirmPassword', formData.confirmPassword);
       
      if ((!(Object.values(formData).includes('')) 
      && formData.password === formData.confirmPassword 
      && emailValidation(formData.email))) {
         setIsButton(true)
        setNewUser(formData.name, formData.email, formData.password).then(responce => {
          if (responce.status === 400) {
            setIsButton(false);
            setEmailDirty(true);
          } else if (responce.status === 200) {
            window.location.href = '/feed';
          }
        }).catch(error => {
          console.log(error);
        });
      }
    }
    return (
        <div className={active ? 'regModal active' : 'regModal'}>
            <div className={active ? 'regModal__content active' : 'regModal__content'} onClick={e => e.stopPropagation()}>
                <div className="handler" onClick={() => setActive()}></div>
                <div className='exit' onClick={() => setActive()}>
                <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 21 21" fill="none">
      <path d="M4.9 2.8C4.72089 2.8 4.54158 2.86823 4.40508 3.00508L3.00508 4.40508C2.73138 4.67878 2.73138 5.12192 3.00508 5.39492L8.11016 10.5L3.00508 15.6051C2.73138 15.8788 2.73138 16.3219 3.00508 16.5949L4.40508 17.9949C4.67878 18.2686 5.12192 18.2686 5.39492 17.9949L10.5 12.8898L15.6051 17.9949C15.8781 18.2686 16.3219 18.2686 16.5949 17.9949L17.9949 16.5949C18.2686 16.3212 18.2686 15.8781 17.9949 15.6051L12.8898 10.5L17.9949 5.39492C18.2686 5.12192 18.2686 4.67808 17.9949 4.40508L16.5949 3.00508C16.3212 2.73138 15.8781 2.73138 15.6051 3.00508L10.5 8.11016L5.39492 3.00508C5.25807 2.86823 5.07911 2.8 4.9 2.8Z" fill="black"/>
      </svg>
                </div>
            <p className="regModal__title">Регистрация</p>
            <form className='formModal' onSubmit={(event)=> handleSubmit(event)}>
            <div className='block-input'>
            <label className='input-label'>Выберите никнейм</label>
            <input type="name" name="name" value={formData.name} className={nameDirty ? 'input inpError' : 'input'} onBlur= {() => handleChange(event)} onChange={() =>handleChange(event)}/>
            <p className={nameDirty ? 'text-valid err-valid' : 'text-valid'}>Укажите имя</p>
            </div>
            <div className='block-input'>
            <label className='input-label'>Электронная почта</label>
            <input type="email" name="email" value={formData.email} className={emailDirty ? 'input inpError' : 'input'} onBlur= {() => handleChange(event)} onChange={() => handleChange(event)}/>
            <p className={emailDirty ? 'text-valid err-valid' : 'text-valid'}>{ newUser.status == 400 ? newUser.message:'Адрес не валиден' }</p>
            </div>
            <div className='block-input'>
            <input type="password" name='password' value={formData.password} placeholder="Пароль" className={passwordDirty ? 'input inpError' : 'input'} onBlur= {() => handleChange(event)} onChange={() => handleChange(event)}/>
            <p className={passwordDirty ? 'text-valid err-valid' : 'text-valid'}>Неверный пароль</p>
            </div>
            <div className='block-input'>
            <input type="password" name='confirmPassword' value={formData.confirmPassword} placeholder="Подтверждение пароля" className={confirmDirty ? 'input inpError' : 'input'} onBlur= {() => handleChange(event)} onChange={() => handleChange(event)}/>
            <p className={confirmDirty ? 'text-valid err-valid' : 'text-valid'}>Пароли не совпадают</p>
            </div>
            <button className="btn-reg" type='submit' disabled={isButton}>Зарегистрироваться</button>
            </form>
            
            </div>
        </div>
    )
}
export default RegModal;