import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "../styles/Navbar.module.css";
import { useSelector } from "react-redux";
const NavbarList = ({ location }) => {
  const { userInfo } = useSelector((state) => state.profile);

  return (
    <nav>
      <ul className={styles.navbar}>
        <li>
          <Link
            className={
              location === "/feed" ? styles.navbar_link_act : styles.navbar_link
            }
            to={userInfo?.id ? "/feed" : "/"}
          >
            <img src="/img/home1.svg" />
            <p
              className={
                location === "/feed" ? styles.subLinkAct : styles.subLink
              }
            >
              Лента
            </p>
          </Link>
        </li>
        <li>
          <Link
            to={userInfo?.id ? "/profile": "/"}
            className={
              location === "/profile"
                ? styles.navbar_link_act
                : styles.navbar_link
            }
          >
            <img src="/img/user.svg" />
            <p
              className={
                location === "/profile" ? styles.subLinkAct : styles.subLink
              }
            >
              Профиль
            </p>
          </Link>
        </li>
        <li>
          <Link
            to={userInfo?.id ? "/settings/profile" : "/"}
            className={
              location === "/settings/profile" ||
              location === "/settings/email" ||
              location === "/settings/password"
                ? styles.navbar_link_act
                : styles.navbar_link
            }
          >
            <img src="/img/adjust.svg" />
            <p
              className={
                location === "/settings/profile" ||
                location === "/settings/email" ||
                location === "/settings/password"
                  ? styles.subLinkAct
                  : styles.subLink
              }
            >
              Настройки
            </p>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavbarList;
