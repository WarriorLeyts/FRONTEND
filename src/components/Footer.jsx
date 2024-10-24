import React from "react";
import NavbarList from "./NavbarList";
import styles from "../styles/Page.module.css";
import { useSelector } from "react-redux";

export default function Footer({ location }) {
  const location1 = location;
  const { userInfo } = useSelector((state) => state.profile);

  return (
    <footer className={styles.footer}>
      <NavbarList location={location1} />{" "}
      <div
        className={styles.avatar}
        style={{ backgroundImage: `url(${userInfo?.avatar || ""})` }}
      ></div>
    </footer>
  );
}
