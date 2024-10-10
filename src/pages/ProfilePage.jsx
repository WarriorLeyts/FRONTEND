import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PostsFeed from "../components/PostsFeed";
import Topics from "../components/Topics.jsx";
import Blogs from "../components/Blogs.jsx";
import UserHeader from "@/components/UserHeader";
import styles from "../styles/ProfilePage.module.css";
import { useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchPostsProfile } from "../store/postsSlice";
import { useEffect, useState } from "react";
import PostWriter from "@/components/PostWriter";

function ProfilePage() {
  const dispatch = useDispatch();
  const location = useLocation();
  const [active, setActive] = useState(false);
  const { userInfo } = useSelector((state) => state.profile);
  const posts = useSelector((state) => state.posts.profilePosts)

  useEffect(() => {
    if (posts.length === 0 && userInfo) {
      dispatch(fetchPostsProfile(userInfo?.id));
    }
  }, [userInfo]);
  
  return (
    <div>
      <Navbar location={location.pathname} />
      <main className={styles.mainProfile}>
        <div className={styles.main1}>
          <UserHeader profileData={userInfo} />
          <PostsFeed posts={posts} />
        </div>
        <div className={styles.main2}>
          <div>
            <Topics />
            <Blogs />
          </div>
        </div>
      </main>
      <Footer location={location.pathname} />
      <div className={styles.newMessage} onClick={() => setActive(true)}>
        <img src="img/pero.svg" />
      </div>
      <div className={styles.postWriter}>
        <PostWriter active={active} setActive={setActive} />
      </div>
    </div>
  );
}

export default ProfilePage;
