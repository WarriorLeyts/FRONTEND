import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PostsFeed from "../components/PostsFeed";
import Topics from "../components/Topics.jsx";
import Blogs from "../components/Blogs.jsx";
import UserHeader from "@/components/UserHeader";
import styles from "../styles/ProfilePage.module.css";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchPostsUser } from "../store/postsSlice";
import { useEffect, useState } from "react";
import PostWriter from "@/components/PostWriter";
import { getOtherProfile } from "@/store/profileSlice";
import { fetchIsFollowing } from "@/store/subscriptions";

function UserProfilePage() {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();
  const [active, setActive] = useState(false);
  const { otherProfile } = useSelector((state) => state.profile);
  const posts = useSelector((state) => state.posts.userPosts);
  const { userInfo } = useSelector((state) => state.profile);
  useEffect(() => {
    if(id) {
      dispatch(getOtherProfile(id));
      dispatch(fetchPostsUser(id));
      dispatch(fetchIsFollowing(id))
    }
    if(location.pathname === `/profile/${userInfo?.id}`) {
      navigate('/profile')
    }
  }, [userInfo?.id]);
  return (
    <div>
      <Navbar location={location.pathname} />
      <main className={styles.mainProfile}>
        <div className={styles.main1}>
          <UserHeader profileData={otherProfile}/>
          <PostsFeed posts={posts}/>
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

export default UserProfilePage;
