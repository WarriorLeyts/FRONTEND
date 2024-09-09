import PostsFeed from '../components/PostsFeed';
import Topics from '../components/Topics.jsx';
import Blogs from '../components/Blogs.jsx';
import styles from '../styles/FeedPage.module.css';
import Navbar from '@/components/Navbar.jsx';
import NewTweet from '@/components/NewTweet.jsx';
import CardUser from '@/components/CardUser.jsx';
import { useState } from 'react';
import Footer from '@/components/Footer';
import { useLocation } from 'react-router-dom';

function FeedPage() {
  const location = useLocation();
  const [active, setActive] = useState(false)
    return (
      <>
      <Navbar location={location.pathname}/>
        <main className={styles.mainFeed}>
          <div className={styles.main1}>
            <NewTweet active={active} setActive={setActive}/>
            <PostsFeed/>
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