import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Subscription from "../components/Subscription";
import Topics from "../components/Topics.jsx";
import Blogs from "../components/Blogs.jsx";
import UserHeader from "@/components/UserHeader";
import styles from "../styles/FollowersFollowingPage.module.css";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { getFollowing } from "@/store/subscriptions";
import { useEffect } from "react";

function FollowingPage() {
  const location = useLocation().pathname; 
  const { userInfo } = useSelector((state) => state.profile);
  const { following } = useSelector((state) => state.subscriptions)
  const dispatch = useDispatch();
  useEffect(() => {
    if (userInfo?.id && !following.length) {
      dispatch(getFollowing(userInfo?.id))
    }
  }, [userInfo?.id])
  return (
    <div>
    <Navbar location={location.pathname} />
    <main className={styles.mainProfile}>
      <div className={styles.main1}>
        <UserHeader profileData={userInfo} />
        <Subscription location={location} subscriptions={following}/>
      </div>
      <div className={styles.main2}>
        <div>
          <Topics />
          <Blogs />
        </div>
      </div>
    </main>
    <Footer location={location.pathname} />
  </div>
  );
}

export default FollowingPage;
