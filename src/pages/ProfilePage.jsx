import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PostsFeed from '../components/PostsFeed';
import Topics from '../components/Topics.jsx';
import Blogs from '../components/Blogs.jsx';
import UserHeader from "@/components/UserHeader";
import styles from '../styles/ProfilePage.module.css';
import { useLocation } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { fetchPostsUser, clearDate } from '../store/postsSlice';
import { useEffect, useState } from "react";
import PostWriter from "@/components/PostWriter";

function ProfilePage() {
  const dispatch = useDispatch();
  const userInfo = useSelector(state => state.profile.userInfo)
  const location = useLocation(); 
  const [active, setActive] = useState(false)
  useEffect(() => {
    dispatch(clearDate())
    dispatch(fetchPostsUser(userInfo?.id))
  }, [])
    return (
      <div>
        <Navbar location={location.pathname}/>
        <main className={styles.mainProfile}>
          <div className={styles.main1}>
            <UserHeader/>
            <PostsFeed/>
          </div>
          <div className={styles.main2}>
          <div><Topics/>
            <Blogs/>
          </div>  
          </div>
        </main>
        <Footer location={location.pathname}/>
        <div className={styles.newMessage} onClick={()=> setActive(true)} ><img src="img/pero.svg"/></div>
        <div className={styles.postWriter}><PostWriter active={active} setActive={setActive}/></div>
      </div>
    );
  }
  
export default ProfilePage;