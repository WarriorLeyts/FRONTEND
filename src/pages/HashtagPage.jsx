import PostsFeed from "../components/PostsFeed";
import Topics from "../components/Topics.jsx";
import Blogs from "../components/Blogs.jsx";
import styles from "../styles/Page.module.css";
import Navbar from "@/components/Navbar.jsx";
import CardUser from "@/components/CardUser.jsx";
import { useEffect } from "react";
import Footer from "@/components/Footer";
import { useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchPostsHashTag } from "@/store/postsSlice";

function HashtagPage() {
  const dispatch = useDispatch();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const tag = queryParams.get('tag');
  const posts = useSelector((state) => state.posts.tagPosts);

  useEffect(() => {
    dispatch(fetchPostsHashTag(tag));
  }, [tag]);

  
  return (
    <>
      <Navbar location={location.pathname} />
      <main className={styles.mainFeed}>
        <div className={styles.main1}>
          <PostsFeed posts={posts} />
        </div>
        <div className={styles.main2}>
          <CardUser />
          <div>
            <Topics />
            <Blogs />
          </div>
        </div>
      </main>
      <Footer location={location.pathname} />
    </>
  );
}

export default HashtagPage;
