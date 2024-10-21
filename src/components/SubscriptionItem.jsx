import styles from "@/styles/SubscriptionItem.module.css";
import { toggleSubscription, upFollowers, addSubscription, deleteSubscription, upSubscriptions } from "@/store/subscriptions";
import { useDispatch, useSelector } from "react-redux";
import { updateUserInfo } from "@/store/profileSlice";
import { Link } from "react-router-dom";
import { upFeedPosts } from "@/store/postsSlice";

const SubscriptionItem = ({ subscription, index, length }) => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.subscriptions);
  const { userInfo } = useSelector((state) => state.profile)

  const handleUpSubscriptions = () => {
    const value = (subscription.subscriptionMessage === 'Читать') ? 'Читаю' : 'Читать';
    dispatch(toggleSubscription(subscription.id))
    dispatch(upFeedPosts({ id: subscription.id, subscriptionMessage: 'Читаю' }));

    if (subscription.subscriptionMessage === 'Читать') {
      dispatch(addSubscription({ ...subscription, subscriptionMessage: value }));
    } else {
      dispatch(deleteSubscription(subscription));
    }
    dispatch(updateUserInfo({ 
      countFolloweds: subscription.subscriptionMessage === 'Читаю' ?
      userInfo.countFolloweds - 1 : userInfo.countFolloweds + 1,
    }))
    dispatch(upSubscriptions({ id: subscription.id, subscriptionMessage: value }));
    dispatch(upFollowers({ id: subscription.id, subscriptionMessage: value }));
    return 
  }
  return (
    <>
    <div className={styles.subscriptionItem}>
      <Link className={styles.subscriptionBlock} to={`/profile/${subscription.id}`}>
        <div className={styles.avatar}
          style={{ backgroundImage: `url(${subscription.avatar || ""})` }}
        >
        </div>
        <div className={styles.infoSubscription}>
           <p className={styles.infoSubscription__name}>{subscription.name}</p>
           <span className={styles.infoSubscription__nickname}>{subscription.nickname}</span>
           <p className={styles.infoSubscription__description}>{subscription.aboutme}</p>
        </div>
      </Link>
        { subscription.id !== userInfo?.id &&
        <button className={ subscription.subscriptionMessage === 'Читаю' ? `${styles.btnActive} ${styles.btn}`: styles.btn}
          onClick={() => handleUpSubscriptions()}
          disabled={loading}
        >{subscription.subscriptionMessage}</button>}
      </div>
      <div className={styles.line} style={index === (length - 1) ? {display: 'none'} : {}}></div>
    </>
  );
};
export default SubscriptionItem;