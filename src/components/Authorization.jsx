import "@/styles/Authorization.css";
import { setModalActive } from "@/store/modals";
import { useDispatch } from "react-redux";

const Authorization = () => {
  const dispatch = useDispatch();
  
  return (
    <>
      <div className="authorization">
        <img className="logo" src="/img/logo.svg" />
        <h1 className="authorization__title">
          {" "}
          Оставайся на связи с друзьями, даже когда{" "}
          <span className="mgtext">их</span> нет рядом
        </h1>
        <div className="authorization-block">
          <button
            className="authorization__btn"
            onClick={() => dispatch(setModalActive({ registrActive: true }))}
          >
            Зарегистрироваться
          </button>
          <button
            className="authorization__btn"
            onClick={() => dispatch(setModalActive({ authorActive: true }))}
          >
            Войти
          </button>
        </div>
      </div>
    </>
  );
};
export default Authorization;
