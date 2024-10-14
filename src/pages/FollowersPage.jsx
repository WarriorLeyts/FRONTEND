import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Subscription from "../components/Subscription";
import Topics from "../components/Topics.jsx";
import Blogs from "../components/Blogs.jsx";
import UserHeader from "@/components/UserHeader";
import styles from "../styles/FollowersFollowingPage.module.css";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { getFollowers } from "@/store/subscriptions";

function FollowersPage() {
  const dispatch = useDispatch();
  const location = useLocation().pathname; 
  const { userInfo } = useSelector((state) => state.profile);
  const { followers } = useSelector((state) => state.subscriptions)
  useEffect(() => {
    if (userInfo?.id && followers.length === 0) {
      dispatch(getFollowers(userInfo?.id))
    }
  }, [userInfo?.id])
  return (
    <div>
    <Navbar location={location.pathname} />
    <main className={styles.mainProfile}>
      <div className={styles.main1}>
        <UserHeader profileData={userInfo} />
        <Subscription location={location} subscriptions={followers}/>
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

export default FollowersPage;
