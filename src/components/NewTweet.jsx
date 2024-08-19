import React, { useState } from 'react';
import styles from '../styles/NewTweet.module.css';
import getPostSize from '@/post_size';

const NewTweet = () => {
    const [tweet, setTweet] = useState('');
    const [postSize, setPostSize] = useState(123);
    const handleSavePost = () => {
        if (!tweet) {
            alert('Не возможно сохранить пустой пост')
        } else {
        const response = fetch('/posts.json', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json;charset=utf-8',
          },
          body: JSON.stringify({ message: tweet }),
        }).then(async response => {
            const message = await response.json();
            if (response.status === 200) {
                alert(message.message);
                setTweet('')
                setPostSize(0)
            } else {
                alert(`Не получилось сохранить пост: ${response.data.error}`)
            }
        })
    }
    }
    return (
    <div className={styles.newTweet}>
        <input className={styles.newTweetInp} type="text"  value={tweet} placeholder='Что нового, Александр?' onChange={(e) => {setTweet(e.target.value); setPostSize(getPostSize(e.target.value))}}/>
        <div className={styles.sendTweet}>
            <p className={styles.messageTweet}>{tweet}</p>
            <div className={styles.footerTweet}>
                <img className={styles.addPhoto}src="img/addPhoto.png"/>
                <div className={styles.blockSend}>
                  <svg className={styles.progressbar} width="52" height="52" viewBox="0 0 52 52" fill="none" xmlns="http://www.w3.org/2000/svg">
                   <text text-anchor="middle" dominant-baseline="middle" x="25" y="26" font-family="Roboto" font-size="16" fill="#0057FF" fontWeight="900">{postSize}</text>
                   <circle className={styles.progressbar__track} cx="26" cy="26"></circle>
                   <circle className={styles.progressbar__thumb}  cx="26" cy="26" opacity={postSize ? 1 : 0} strokeDasharray={`${postSize/4} ${500}`}></circle>
                 </svg>
                  <button className={styles.btnTweet} onClick={handleSavePost}>Отправить</button>
                </div>
            </div>
        </div>
    </div>
    );
};
export default NewTweet;