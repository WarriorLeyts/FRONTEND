import React from "react";
import styles from "../styles/UserHeader.module.css";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { toggleSubscription } from "@/store/subscriptions";
import { useDispatch, useSelector } from "react-redux";
import { upFeedPosts } from "@/store/postsSlice";
import { updateUserInfo, updateOtherProfile } from "@/store/profileSlice";
import formatBirthday from "@/formatBirthday";
import { addUserFollowers, deleteUserFollowers } from "@/store/subscriptions";

export default function UserHeader({ profileData }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation().pathname;
  const { userInfo } = useSelector((state) => state.profile);
  const { subscriptionMessage, loading } = useSelector((state) => state.subscriptions);

  const handleSubscription = () => {
    dispatch(upFeedPosts({ id: profileData?.id, subscriptionMessage }));
    dispatch(toggleSubscription(profileData?.id));
    if (subscriptionMessage === 'Читаю') {
      dispatch(deleteUserFollowers(userInfo));
    } else {
      dispatch(addUserFollowers({...userInfo, subscriptionMessage: 'Читать'}));
    }
    dispatch(updateUserInfo({ 
      countFolloweds: subscriptionMessage === 'Читаю' ?
        userInfo.countFolloweds - 1 : userInfo.countFolloweds + 1,
    }))
    dispatch(updateOtherProfile({ 
      countFollowers: subscriptionMessage === 'Читаю' ?
        profileData?.countFollowers - 1 : profileData?.countFollowers + 1,
    })) 
  }
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
            <img src="/img/location.svg" alt="локация" />
            {profileData?.location}
          </li>
          <li>
            {" "}
            <img src="/img/link.svg" alt="ссылка" />
            <a href={profileData?.website}>{profileData?.website}</a>
          </li>
          <li>
            {" "}
            <img src="/img/calendar.svg" alt="календарь" />
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
              <Link to={(location === '/profile') 
                || (location === '/followers')
                ||  (location === '/following')
                 ? '/following' : `/profile/${profileData?.id}/following`}>
                <p>{profileData?.countFolloweds}</p>
                <span>Читаемых</span>
              </Link>
            </li>
            <li>
              <Link to={(location === '/profile')
                || (location === '/followers')
                ||  (location === '/following')               
                ? '/followers' : `/profile/${profileData?.id}/followers`}>
                <p>{profileData?.countFollowers}</p>
                <span>Читателей</span>
              </Link>
            </li>
          </ul>
          {(location === '/profile') 
            || (location === '/followers')
            || (location === '/following') ? (
            <button
              className={styles.btn}
              onClick={() => navigate("/settings/profile")}
            >
              Редактировать профиль
            </button>
          ) : (
            <button className={ subscriptionMessage === 'Читаю' ? `${styles.btnActive} ${styles.btn}`: styles.btn}
            disabled={loading}
            onClick={() => userInfo?.id ? handleSubscription() : navigate('/')}
            >
              {subscriptionMessage ? subscriptionMessage : 'Зарегистриро ваться'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
