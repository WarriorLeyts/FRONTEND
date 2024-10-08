import React, { useState, useEffect } from "react";
import styles from "../styles/passwordSettings.module.css";
import { useDispatch, useSelector } from "react-redux";
import { updatePassword, setErrors } from "@/store/profileSlice";

export default function PasswordSettings() {
  const dispatch = useDispatch();
  const { loading, message, errorsServer } = useSelector(
    (state) => state.profile
  );
  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  
  if (message) {
    dispatch(clearDateProfile());
    setFormData({
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
  }
  
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (name === "oldPassword") {
      setErrors({ errOldPass: false });
    }
    if (name === "newPassword") {
      setErrors({ errNewPass: false });
    }
    if (name === "confirmPassword" && value != formData.newPassword) {
      setErrors({ errConfirm: "Пароли не совпадают", });
    } else {
      setErrors({ errConfirm: false });
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const isEpmty = Object.values(formData).includes("");
    if (errorsServer?.errConfirm || isEpmty) {
      return isEpmty && alert("Нет данных для обновления. Заполните все поля.");
    }
    dispatch(updatePassword(formData));
  };

  return (
    <form className={styles.passwordSettings}>
      <div className={styles.blockSettings}>
        <div className="block-input">
          <label className="input-label">Старый пароль</label>
          <input
            type="password"
            name="oldPassword"
            value={formData.oldPassword}
            className={
              errorsServer?.errOldPass
                ? `${styles.input} input inpError`
                : `${styles.input} input `
            }
            onChange={(event) => handleChange(event)}
          />
          <p className="text-valid err-valid" style={{ marginBottom: "0px" }}>
            {errorsServer?.errOldPass}
          </p>
        </div>
        <div className="block-input">
          <label className="input-label">Новый пароль</label>
          <input
            type="password"
            name="newPassword"
            value={formData.newPassword}
            className={
              errorsServer?.errNewPass
                ? `${styles.input} input inpError`
                : `${styles.input} input `
            }
            onChange={(event) => handleChange(event)}
          />
          <p className="text-valid err-valid" style={{ marginBottom: "0px" }}>
            {errorsServer?.errNewPass}
          </p>
        </div>
        <div className="block-input">
          <label className="input-label">новый пароль еще раз</label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            className={
              errorsServer?.errConfirm
                ? `${styles.input} input inpError`
                : `${styles.input} input `
            }
            onChange={(event) => handleChange(event)}
          />
          <p className="text-valid err-valid" style={{ marginBottom: "0px" }}>
            {errorsServer?.errConfirm}
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
          onClick={(event) => handleSubmit(event)}
        >
          Сохранить
        </button>
      )}
    </form>
  );
}
