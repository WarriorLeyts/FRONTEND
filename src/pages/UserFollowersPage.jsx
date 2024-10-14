import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Subscription from "../components/Subscription";
import Topics from "../components/Topics.jsx";
import Blogs from "../components/Blogs.jsx";
import UserHeader from "@/components/UserHeader";
import styles from "../styles/FollowersFollowingPage.module.css";
import { useSelector, useDispatch } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import { useEffect } from "react";
import { getUserFollowers } from "@/store/subscriptions";

function UserFollowersPage() {
  const dispatch = useDispatch();
  const location = useLocation().pathname;
  const { id } = useParams();
  const { otherProfile } = useSelector((state) => state.profile);
  const { userFollowers } = useSelector((state) => state.subscriptions)
  useEffect(() => {
    if (id) {
      dispatch(getUserFollowers(id))
    }
  }, [])

  return (
    <div>
    <Navbar location={location.pathname} />
    <main className={styles.mainProfile}>
      <div className={styles.main1}>
        <UserHeader profileData={otherProfile} />
        <Subscription location={location} subscriptions={userFollowers} id={id}/>
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

export default UserFollowersPage;
