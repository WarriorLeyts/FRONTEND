import PostsFeed from "../components/PostsFeed";
import Topics from "../components/Topics.jsx";
import Blogs from "../components/Blogs.jsx";
import styles from "../styles/Page.module.css";
import Navbar from "@/components/Navbar.jsx";
import PostWriter from "@/components/PostWriter.jsx";
import CardUser from "@/components/CardUser.jsx";
import { useEffect } from "react";
import Footer from "@/components/Footer";
import { useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchPostsSubscriptions } from "../store/postsSlice";
import { setModalActive } from "@/store/modals";

function FeedPage() {
  const dispatch = useDispatch();
  const location = useLocation();
  const posts = useSelector((state) => state.posts.feedPosts);

  useEffect(() => {
    if(posts.length === 0) {
      dispatch(fetchPostsSubscriptions());
    }
  }, [location]);
  
  return (
    <>
      <Navbar location={location.pathname} />
      <main className={styles.mainFeed}>
        <div className={styles.main1}>
          <PostWriter />
          <PostsFeed  posts={posts} />
        </div>
        <div className={styles.main2}>
          <CardUser />
          <div>
            <Topics />
            <Blogs />
          </div>
        </div>
      </main>
      <div className={styles.newMessage} onClick={() => dispatch(setModalActive({ newPostActive: true }))}>
        <img src="img/pero.svg" />
      </div>
      <Footer location={location.pathname} />
    </>
  );
}

export default FeedPage;
