import styles from "../styles/cardUser.module.css";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const CardUser = () => {
  const { userInfo } = useSelector((state) => state.profile);

  return (
    <div className={styles.cardUser}>
      <div className={styles.userInfoBlock}>
        <div
          className={styles.avatar}
          style={{ backgroundImage: `url(${userInfo?.avatar || ""})` }}
        ></div>
        <div className={styles.userInfo}>
          <p className={styles.name}>{userInfo?.name}</p>
          <span className={styles.nickname}>{userInfo?.nickname}</span>
        </div>
      </div>
      <div className={styles.statistics}>
        <div className={styles.statistic}>
          <p className={styles.title}>{userInfo?.countPosts}</p>
          <span className={styles.subTitle}>Сообщений</span>
        </div>
        <div className={styles.statistic}>
          <p className={styles.title}>{userInfo?.countFolloweds}</p>
          <span className={styles.subTitle}>Читаемых</span>
        </div>
        <div className={styles.statistic}>
          <p className={styles.title}>{userInfo?.countFollowers}</p>
          <span className={styles.subTitle}>Читателей</span>
        </div>
      </div>
    </div>
  );
};
export default CardUser;
