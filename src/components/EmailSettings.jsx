import React, { useEffect, useState } from "react";
import styles from "../styles/emailSettings.module.css";
import { useDispatch, useSelector } from "react-redux";
import emailValidation from "@/email_validation.js";
import { updateEmail, setErrors } from "@/store/profileSlice";

export default function EmailSettings() {
  const dispath = useDispatch();
  const { loading, errorsServer, message } = useSelector(
    (state) => state.profile
  );
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  if (message) {
    setFormData({
      email: "",
      password: "",
    });
    dispath(clearDateProfile());
  }

  const handleClick = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "email" ? value.toLowerCase() : value,
    }));
    if (name === "email" && !emailValidation(value)) {
      setErrors({ errorEmail: "Адрес не валиден", });
    } else {
      setErrors({ errorEmail: false });
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const isEmphty = Object.values(formData).includes("");
    if (isEmphty || errorsServer?.errorEmail) {
      return (
        isEmphty && alert("Нет данных для обновления. Заполните все поля!")
      );
    }
    return dispath(updateEmail(formData));
  };

  return (
    <form
      className={styles.emailSettings}
      onSubmit={(event) => handleSubmit(event)}
    >
      <div className={styles.blockSettings}>
        <div className="block-input">
          <label className="input-label">Новая электронная почта</label>
          <input
            type="email"
            name="email"
            className={
              errorsServer?.errorEmail
                ? `${styles.input} input inpError`
                : `${styles.input} input `
            }
            value={formData.email}
            onChange={(event) => handleClick(event)}
          />
          <p className="text-valid err-valid" style={{ marginBottom: "0px" }}>
            {errorsServer?.errorEmail}
          </p>
        </div>
        <div className="block-input">
          <label className="input-label">Пароль для подтвреждения</label>
          <input
            type="password"
            name="password"
            className={
              errorsServer?.errorPass
                ? `${styles.input} input inpError`
                : `${styles.input} input `
            }
            value={formData.password}
            onChange={(event) => handleClick(event)}
          />
          <p className="text-valid err-valid" style={{ marginBottom: "0px" }}>
            {errorsServer?.errorPass}
          </p>
        </div>
      </div>
      {loading ? (
        <div className="loader" style={{ marginLeft: "60px" }}></div>
      ) : (
        <button
          className="btn-reg"
          type="submit"
          style={{ width: "180px", height: "52px" }}
        >
          Сохранить
        </button>
      )}
    </form>
  );
}
