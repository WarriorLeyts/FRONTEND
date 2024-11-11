import React, { useState, useEffect } from "react";
import styles from "../styles/postWriter.module.css";
import getPostSize from "@/post_size";
import AddPhoto from "./AddPhoto";
import { useSwipeable } from "react-swipeable";
import { useDispatch, useSelector } from "react-redux";
import { newPost, addPost } from "../store/postsSlice";
import { setModalActive } from "@/store/modals";
import { updateUserInfo } from "@/store/profileSlice";
import { upTopics } from "@/store/topicsSlice";

const PostWriter = () => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.profile);
  const [tweet, setTweet] = useState("");
  const [postSize, setPostSize] = useState(123);
  const [imgUrl, setImgUrl] = useState("");
  const [activeSendBlock, setActiveSendBlock] = useState(false);
  const active = useSelector((state) => state.modals.modalsActive.newPostActive);
  const { newPostLoading } = useSelector(
    (state) => state.posts
  );

  const progressBar = (
    <svg
      className={styles.progressbar}
      width="52"
      height="52"
      viewBox="0 0 52 52"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <text
        textAnchor="middle"
        dominantBaseline="middle"
        x="25"
        y="26"
        fontFamily="Roboto"
        fontSize="16"
        fill="#0057FF"
        fontWeight="900"
      >
        {postSize}
      </text>
      <circle className={styles.progressbar__track} cx="26" cy="26"></circle>
      <circle
        className={styles.progressbar__thumb}
        cx="26"
        cy="26"
        opacity={postSize ? 1 : 0}
        strokeDasharray={`${postSize} ${500}`}
      ></circle>
    </svg>
  );

  const handlers = useSwipeable({
    onSwipedDown: (eventData) => {
      console.log("Свайп вниз!", eventData);
      dispatch(setModalActive({ newPostActive: false }))
    },
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  });

  const handleSavePost = () => {
    if (!tweet && !imgUrl) {
      return alert("Не возможно сохранить пустой пост");
    }
    const post = { message: tweet, messageImg: imgUrl };
    dispatch(newPost(post));
    setTweet("");
    setPostSize(0);
    dispatch(setModalActive({ newPostActive: false }))
    setImgUrl("");
    dispatch(addPost({ 
      message: tweet, message_img: imgUrl, 
      avatar: userInfo?.avatar, name: userInfo?.name, 
      nickname: userInfo?.nickname, date: (new Date()).toString()
    }));
    dispatch(updateUserInfo({ countPosts: userInfo?.countPosts + 1}))
    dispatch(upTopics(post))
  };

  return (
    <>
      <div
        className={
          active
            ? `${styles.bgPostWriter} ${styles.bgPostWriterAct}`
            : styles.bgPostWriter
        }
      ></div>
      <div
        {...handlers}
        className={active ? styles.newTweet_active : styles.newTweet}
      >
        <div
          className={activeSendBlock || active ? styles.sendTweetActive : styles.sendTweet}
        >
          <div
            className="handler"
            style={{ marginTop: "10px", marginBottom: "20px" }}
            onClick={() => dispatch(setModalActive({ newPostActive: false }))}
          ></div>
          <textarea
            maxlength="200"
            className={activeSendBlock || active ? styles.newTweetInpActive : styles.newTweetInp}
            type="text"
            value={tweet}
            placeholder={(!activeSendBlock || active) && `Что нового, ${userInfo?.name || 'пользователь'}?`}
            onChange={(e) => {
              setTweet(e.target.value);
              setPostSize(getPostSize(e.target.value));
            }}
            onClick={() => setActiveSendBlock(true)}
          />
          <div className={styles.footerTweet}
            style={activeSendBlock || active ? {display: 'flex'} : {}}
          >
            {active ? (
              progressBar
            ) : (
              <div style={{ display: "flex", gap: "5px" }}>
                <AddPhoto imgUrl={imgUrl} setImgUrl={setImgUrl} />
                {imgUrl && (
                  <div
                    className={styles.addedPhoto}
                    style={{ backgroundImage: `url(${imgUrl})` }}
                  >
                    <img
                      className={styles.exit}
                      src="img/exit.svg"
                      onClick={() => setImgUrl("")}
                    />
                  </div>
                )}
              </div>
            )}
            <div className={styles.blockSend}>
              {active ? (
                <div style={{ display: "flex", gap: "5px" }}>
                  {imgUrl && (
                    <div
                      className={styles.addedPhoto}
                      style={{ backgroundImage: `url(${imgUrl})` }}
                    >
                      <img
                        className={styles.exit}
                        src="img/exit.svg"
                        onClick={() => setImgUrl("")}
                      />
                    </div>
                  )}
                  <AddPhoto imgUrl={imgUrl} setImgUrl={setImgUrl} />
                </div>
              ) : (
                progressBar
              )}
              {newPostLoading ? (
                <div className="loader"></div>
              ) : (
                <button
                  className={styles.btnTweet}
                  onClick={() => handleSavePost()}
                >
                  Отправить
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default PostWriter;
