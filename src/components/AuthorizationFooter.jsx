import styles from "@/styles/AuthorizationFooter.module.css";
import { setModalActive } from "@/store/modals";
import { useDispatch } from "react-redux";

const AuthorizationFooter = () => {
  const dispatch = useDispatch();
  
  return (
    <section className={styles.authorizationFooter}>
      <div className={styles.authorization}>
        <h1 className={styles.authorization__title}>
          {" "}
          Зарегистрируйтесь и узнайте обо всём первым
        </h1>
        <div className={styles.authorization__block}>
          <button
            className={styles.authorization__btn}
            onClick={() => dispatch(setModalActive({ registrActive: true }))}
          >
            Зарегистрироваться
          </button>
          <button
            className={styles.authorization__btn}
            onClick={() => dispatch(setModalActive({ authorActive: true }))}
          >
            Войти
          </button>
        </div>
      </div>
    </section>
  );
};
export default AuthorizationFooter;
