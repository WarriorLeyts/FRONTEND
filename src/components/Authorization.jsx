import '@/styles/Authorization.css';


const Authorization = ({ setActive }) => {
    return (
        <>
        <div className="authorization">
        <img className="logo" src="img/logo.svg"/>
           <h1 className="authorization__title"> Оставайся на связи с друзьями, даже когда <span className="mgtext">их</span> нет рядом</h1>
            <div className="authorization-block">
                <button className="authorization__btn" onClick={() => setActive('reg')}>Зарегистрироваться</button>
                <button className="authorization__btn" onClick={() => setActive('auth')}>Войти</button>
          </div>
    </div>
    </>
    
    )
}
export default Authorization;
