import '@/styles/Authorization.css';
import usemodalActive from '@/store/modal.js';
import { useEffect } from "react";


const Authorization = () => {
    const setRegModalActive = usemodalActive ((state) => state.setRegModalActive);
    const setAuthorModalActive = usemodalActive ((state) => state.setAuthorModalActive);
    return (
        <>
        <div className="authorization">
        <img className="logo" src="img/logo.svg"/>
           <h1 className="authorization__title"> Оставайся на связи с друзьями, даже когда <span className="mgtext">их</span> нет рядом</h1>
            <div className="authorization-block">
                <button className="authorization__btn" onClick={() => setRegModalActive()}>Зарегистрироваться</button>
                <button className="authorization__btn" onClick={() => setAuthorModalActive()}>Войти</button>
          </div>
    </div>
    </>
    
    )
}
export default Authorization;
