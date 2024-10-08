import React from "react";
import styles from "../styles/UserHeader.module.css";
import { useNavigate, useLocation } from "react-router-dom";
import { toggleSubscription } from "@/store/subscriptions";
import { useDispatch, useSelector } from "react-redux";
import { upFeedPosts } from "@/store/postsSlice";
import { updateUserInfo, updateOtherProfile } from "@/store/profileSlice";
import formatBirthday from "@/formatBirthday";

export default function UserHeader({ profileData }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation().pathname;
  const { userInfo } = useSelector((state) => state.profile);
  const { subscriptionMessage, loading } = useSelector((state) => state.subscriptions);
  return (
    <div className={styles.userHeader}>
      <div className={styles.userInfo}>
        <div
          className={styles.avatar}
          style={{ backgroundImage: `url(${profileData?.avatar || ""})` }}
        ></div>
        <p className={styles.name}>{profileData?.name}</p>
        <span className={styles.nickname}>{profileData?.nickname}</span>
        <p className={styles.aboutme}>{profileData?.aboutme}</p>
        <ul className={styles.descriptions}>
          <li>
            {" "}
            <img src="../img/location.svg" alt="локация" />
            {profileData?.location}
          </li>
          <li>
            {" "}
            <img src="../img/link.svg" alt="ссылка" />
            <a href={profileData?.website}>{profileData?.website}</a>
          </li>
          <li>
            {" "}
            <img src="../img/calendar.svg" alt="календарь" />
            {profileData?.dateOfBirth && formatBirthday(profileData?.dateOfBirth)}
          </li>
        </ul>
        <div className={styles.footer}>
          <ul className={styles.statistics}>
            <li>
              <p>{profileData?.countPosts}</p>
              <span>Сообщений</span>
            </li>
            <li>
              <p>{profileData?.countFolloweds}</p>
              <span>Читаемых</span>
            </li>
            <li>
              <p>{profileData?.countFollowers}</p>
              <span>Читателей</span>
            </li>
          </ul>
          {location !== "/profile" ? (
            <button className={`${styles.btn} btn-reg`} 
            disabled={loading}
            onClick={() => {
              dispatch(upFeedPosts({ id: profileData?.id, subscriptionMessage }));
              dispatch(toggleSubscription(profileData?.id));
              dispatch(updateUserInfo({ 
                countFolloweds: subscriptionMessage === 'Не читать' ?
                  userInfo.countFolloweds - 1 : userInfo.countFolloweds + 1,
               }))
               dispatch(updateOtherProfile({ 
                countFollowers: subscriptionMessage === 'Не читать' ?
                  profileData?.countFollowers - 1 : profileData?.countFollowers + 1,
               })) 
            }}
            >
              {subscriptionMessage}
            </button>
          ) : (
            <button
              className={`${styles.btn} btn-reg`}
              onClick={() => navigate("/settings/profile")}
            >
              Редактировать профиль
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
