import styles from "@/styles/SubscriptionList.module.css";
import React  from "react";
import SubscriptionItem from "./SubscriptionItem";
const SubscriptionList = ({ subscriptions }) => {
  return (
    <div className={styles.subscriptionList}>
      {subscriptions?.map((subscription, index) => {
      return <SubscriptionItem subscription={subscription} index={index} length={subscriptions.length}/>
      })}
    </div>
  );
};
export default SubscriptionList;
