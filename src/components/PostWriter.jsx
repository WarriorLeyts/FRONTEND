import React, { useState, useEffect} from 'react';
import styles from '../styles/postWriter.module.css';
import getPostSize from '@/post_size';
import AddPhoto from './AddPhoto';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts, newPost, clearDate } from '../store/postsSlice';

const PostWriter = ({ active, setActive }) => {
    const dispath = useDispatch();
    const { userInfo } = useSelector((state) => state.profile);
    const [tweet, setTweet] = useState('');
    const [postSize, setPostSize] = useState(123);
    const [imgUrl, setImgUrl] = useState('');

    const { newPostLoading, message, error } = useSelector((state) => state.posts)

    const progressBar = <svg className={styles.progressbar} width="52" height="52" viewBox="0 0 52 52" fill="none" xmlns="http://www.w3.org/2000/svg">
    <text textAnchor="middle" dominantBaseline="middle" x="25" y="26" fontFamily="Roboto" fontSize="16" fill="#0057FF" fontWeight="900">{postSize}</text>
    <circle className={styles.progressbar__track} cx="26" cy="26"></circle>
    <circle className={styles.progressbar__thumb}  cx="26" cy="26" opacity={postSize ? 1 : 0} strokeDasharray={`${postSize/4} ${500}`}></circle>
    </svg>

    useEffect(() => {
        if (error) {
            alert(error);
        }
    }, [error]);
    useEffect(() => {
       if (message) {
            alert(message);
            setTweet('');
            setPostSize(0);
            setActive(false);
        }
    }, [message]);

    const handleSavePost = () => {
        if (!tweet && !imgUrl) {
          return alert('Не возможно сохранить пустой пост');
        }
        const post = {message: tweet , messageImg: imgUrl}
        dispath(newPost(post));
    }
    return (
        <>
    <div className={active ? `${styles.bgPostWriter} ${styles.bgPostWriterAct}` : styles.bgPostWriter}></div>
    <div className={active ? styles.newTweet_active : styles.newTweet } >
        {active ? '': <input className={styles.newTweetInp} type="text"  value={tweet} placeholder={`Что нового, ${userInfo?.name}?`} onChange={(e) => {setTweet(e.target.value); setPostSize(getPostSize(e.target.value))}}/>}
        <div className={styles.sendTweet}>
        {active && <div className="handler" style={{marginTop: "10px", marginBottom: "20px"}} onClick={() => setActive()}></div>}
        {active ? <textarea className={styles.newTweetInp} type="text"  value={tweet} placeholder={`Что нового, ${userInfo?.name}?`} onChange={(e) => {setTweet(e.target.value); setPostSize(getPostSize(e.target.value))}}/> 
        : <p className={styles.messageTweet}>{tweet}</p>}
            <div className={styles.footerTweet}>
                {active ? progressBar : <div style={{display: "flex", gap: "5px"}}>
                    <AddPhoto imgUrl={imgUrl} setImgUrl={setImgUrl}/> 
                    {imgUrl && <div className={styles.addedPhoto} style={{backgroundImage: `url(${imgUrl})`}}> 
                        <img className={styles.exit} src='img/exit.svg'
                        onClick={() => setImgUrl('')}/>
                        </div>}
                    </div> } 
                <div className={styles.blockSend}>
                {active ? <div style={{display: "flex", gap: "5px"}}>
                    {imgUrl && <div className={styles.addedPhoto} style={{backgroundImage: `url(${imgUrl})`}}> 
                        <img className={styles.exit} src='img/exit.svg'
                        onClick={() => setImgUrl('')}/>
                        </div>}
                        <AddPhoto imgUrl={imgUrl} setImgUrl={setImgUrl}/> 
                    </div>
                     :  progressBar}
                  { newPostLoading ? <div className="loader"></div>
                    : <button className={styles.btnTweet} onClick={() => handleSavePost()}>Отправить</button>}
                </div>
            </div>
        </div>

    </div>
    </>
    );
};
export default PostWriter;