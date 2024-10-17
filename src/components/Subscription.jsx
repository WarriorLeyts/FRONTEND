import styles from "@/styles/Subscription.module.css";
import React  from "react";
import SubscriptionList from "./SubscriptionList";

const Subscription = ({ location, subscriptions, id }) => {
    const subscriptions1 = subscriptions;
  return (
    <div className={styles.subscription}>
      <h4 className={styles.subscription__title}> {
        (location === '/followers') || (location === `/profile/${id}/followers`) ? 'Подписчики' :  'Подписки'}</h4>
      <SubscriptionList subscriptions={subscriptions1} />
    </div>
  );
};
export default Subscription;