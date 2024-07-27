import '@/styles/AuthorModal.css';
import  usemodalActive from '@/store/modal.js';
import React, { useEffect, useState } from "react";
import useFetchStore from '@/store/fetch.js';
import emailValidation from '@/email_validation.js';

const AuthorModal = () => {
    const active = usemodalActive ((state) => state.authorModalActive);
    const setActive = usemodalActive ((state) => state.setAuthorModalActive);
    const [formData, setFormData] = useState({
        email: "", 
        password: "", 
    })
    const [emailDirty, setEmailDirty] = useState({
      empty: false,
      validation: false
    });
    const [passwordDirty, setPasswordDirty] = useState(false);
    const [isButton, setIsButton] = useState(false);
    const login = useFetchStore ((state) => state.login);
    const setLogin = useFetchStore ((state) => state.setLogin);
    const handleError = (name, value) => {
        switch (name) {
            case 'email':
              if (value === '') {
                setEmailDirty(prevEmail => ({
                  ...prevEmail,
                  empty: true
              }))
              } else {
                setEmailDirty(prevEmail => ({
                  ...prevEmail,
                  empty: false
              }))
              }
              if (!(emailValidation(value))) {
                setEmailDirty(prevEmail => ({
                  ...prevEmail,
                  validation: true
              }))
              } else {
                setEmailDirty(prevEmail => ({
                  ...prevEmail,
                  validation: false
              }))
              }
              break;
            case 'password':
              if ((value === '')) {
                  setPasswordDirty(true)
              } else {
                  setPasswordDirty(false)
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
        handleError('email', formData.email);
        handleError('password', formData.password);
      if ((!(Object.values(formData).includes('')) 
      && emailValidation(formData.email))) {
         setIsButton(true)
        setLogin(formData.email, formData.password).then(responce => {
          if (responce.status === 400) {
            setIsButton(false);
            setEmailDirty(prevEmail => ({
              ...prevEmail,
              empty: true
          }))
          setPasswordDirty(true)
          } else if (responce.status === 200) {
            window.location.href = '/feed';
          }
        }).catch(error => {
          console.log(error);
        });
      }
    }  
    return (
        <div className={active ? 'authorModal active' : 'authorModal'}>
            <div className={active ? 'authorModal__content active' : 'authorModal__content'} onClick={e => e.stopPropagation()}>
                <div className="handler" onClick={() => setActive()}></div>
                <div className='exit' onClick={() => setActive()}>
                <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 21 21" fill="none">
        <path d="M4.9 2.8C4.72089 2.8 4.54158 2.86823 4.40508 3.00508L3.00508 4.40508C2.73138 4.67878 2.73138 5.12192 3.00508 5.39492L8.11016 10.5L3.00508 15.6051C2.73138 15.8788 2.73138 16.3219 3.00508 16.5949L4.40508 17.9949C4.67878 18.2686 5.12192 18.2686 5.39492 17.9949L10.5 12.8898L15.6051 17.9949C15.8781 18.2686 16.3219 18.2686 16.5949 17.9949L17.9949 16.5949C18.2686 16.3212 18.2686 15.8781 17.9949 15.6051L12.8898 10.5L17.9949 5.39492C18.2686 5.12192 18.2686 4.67808 17.9949 4.40508L16.5949 3.00508C16.3212 2.73138 15.8781 2.73138 15.6051 3.00508L10.5 8.11016L5.39492 3.00508C5.25807 2.86823 5.07911 2.8 4.9 2.8Z" fill="black"/>
             </svg>
                </div>
            <p className="authorModal__title">Авторизация</p>
            <form className='formModal' onSubmit={(event)=> handleSubmit(event)}>
            <div className='block-input'>
            <label className='input-label'>Адрес электронной почты</label>
            <input type="email" name='email' value={formData.email} className={(emailDirty.empty || emailDirty.validation) ? 'input inpError' : 'input'} onBlur= {() => handleChange(event)} onChange={() => handleChange(event)}/>
            <p className={((emailDirty.empty || emailDirty.validation)) ? 'text-valid err-valid' : 'text-valid'}>{emailDirty.empty && login.status != 400 ? 'Введите адрес электронной почты' : emailDirty.validation ? 'Адрес не валиден' : 'Пользователь с такими данными не найден.'}</p>
            </div>
            <div className='block-input'>
            <label className='input-label'>Пароль</label>
            <input type="password" name='password' value={formData.password} className={passwordDirty ? 'input inpError' : 'input'} onBlur= {() => handleChange(event)} onChange={() => handleChange(event)}/>
            <p className={passwordDirty ? 'text-valid err-valid' : 'text-valid'}>{login.status == 400 ? login.message: 'Введите пароль'}</p>
            </div>
            <button className="btn-author" type='submit' disabled={isButton}>Войти</button>
            </form>
            </div>
        </div>
    )
}
export default AuthorModal;