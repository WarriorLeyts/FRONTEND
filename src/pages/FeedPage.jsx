import PostsFeed from '../components/PostsFeed';
import Topics from '../components/Topics.jsx';
import Blogs from '../components/Blogs.jsx';
import styles from '../styles/FeedPage.module.css';
import Navbar from '@/components/Navbar.jsx';
import PostWriter from '@/components/PostWriter.jsx';
import CardUser from '@/components/CardUser.jsx';
import { useState, useEffect } from 'react';
import Footer from '@/components/Footer';
import { useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPosts, clearDate } from '../store/postsSlice';

function FeedPage() {
  const dispatch = useDispatch();
  const location = useLocation();
  const [active, setActive] = useState(false)
  let message = useSelector((state) => state.posts.message);

  useEffect(() => {
      dispatch(fetchPosts());
      dispatch(clearDate())
  }, [message]);

    return (
      <>
      <Navbar location={location.pathname}/>
        <main className={styles.mainFeed}>
          <div className={styles.main1}>
            <PostWriter active={active} setActive={setActive}/>
            <PostsFeed profile={'feed'}/>
          </div>
          <div className={styles.main2}>
            <CardUser/>
          <div><Topics/>
            <Blogs/>
          </div>  
          </div>
        </main>
        <div className={styles.newMessage} onClick={()=> setActive(true)} ><img src="img/pero.svg"/></div>
        <Footer location={location.pathname}/>
      </>
    );
  }
  
export default FeedPage;