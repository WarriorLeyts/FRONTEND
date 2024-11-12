import "@/styles/LastMessages.css";
import "@/styles/LastMessageList.css";
import getTimeString from "@/get_time_string.js";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import getBackLightHash from "@/get_backlight_hash";
import getReplaceLink from "@/get_replace_link";
import { useDispatch  } from "react-redux";
import { likePost, unlikePost, upPosts } from "@/store/postsSlice";


const Post = ({ post, index }) => {
  const dispatch = useDispatch();
  const [time, setTime] = useState(getTimeString(post.date, new Date()));
  const [count, setCount] = useState(0);

  setInterval(() => setCount(prevCount => prevCount + 1), 60_000);
  const toggleLike = () => {
    if (post.isLiked) {
      dispatch(unlikePost(post.post_id))
      dispatch(upPosts({ postId: post.post_id, isLiked: false, countLikes : post.countLikes - 1 }))
     } else {
      dispatch(likePost(post.post_id))
      dispatch(upPosts({ postId: post.post_id, isLiked: true, countLikes : post.countLikes + 1 }))
     }
  }
  useEffect(() => {
    setTime(getTimeString(post.date, new Date()));
    setCount(0)
  }, [post, count, post.isLiked])

  return (
    <>
      <div className="post">
        <Link to={`/profile/${post.id}`}>
          <div
            className="post__avatar"
            style={{ backgroundImage: `url(${post.avatar})` }}
          ></div>
        </Link>
        <div className="user">
          <div className="user-information">
            <Link
              to={`/profile/${post.id}`}
              className="user-information__user-name"
            >
              {post.name}
              <span className="mail">{post.nickname}</span>
            </Link>
            <div className="user-information__time-message">
              <p>{time}</p>
            </div>
          </div>
          <div className="user-message mg-rg">
            <p dangerouslySetInnerHTML={{ __html: getBackLightHash(getReplaceLink(post.message)) }} />
            {post.message_img ? (
              <img
                className="message-img"
                src={post.message_img}
                alt="Сообщение"
              />
            ) : null}
          </div>
          <div className="user-interaction">
            <div className="user-interaction__item">
                <svg
                  className="user-interaction__icon"
                  width="15"
                  height="11"
                  viewBox="0 0 15 11"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4.6875 0.8125L1.40625 4.5625M1.40625 4.5625L4.6875 8.3125M1.40625 4.5625H8.4375C12.1875 4.5625 14.0625 6.4375 14.0625 10.1875"
                    stroke="#ABACB1"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              <p>{post.quantityReposts}</p>
            </div>
            <div className="user-interaction__item">
                <div className="user-interaction__icon-block" onClick={() => toggleLike()}>
                  <svg
                    className={post.isLiked ? "user-interaction__favs_act" : "user-interaction__favs"}
                    width="15"
                    height="13"
                    viewBox="0 0 15 13"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M1.875 6.5C0.46875 4.625 0.9375 1.8125 3.28125 0.875C5.625 -0.0624999 7.03125 1.8125 7.5 2.75C7.96875 1.8125 9.84375 -0.0624999 12.1875 0.875C14.5312 1.8125 14.5312 4.625 13.125 6.5C11.7187 8.375 7.5 12.125 7.5 12.125C7.5 12.125 3.28125 8.375 1.875 6.5Z"
                      stroke="#ABACB1"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              <p>{post.countLikes ? post.countLikes : ''}</p>
            </div>

            <div className="user-interaction__item">
                <svg
                  className="user-interaction__icon"
                  width="13"
                  height="14"
                  viewBox="0 0 13 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12.125 9.3125V13.0625H0.875V9.3125M6.5 0.875V10.25M6.5 0.875L2.75 4.625M6.5 0.875L10.25 4.625"
                    stroke="#ABACB1"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              <p>{post.quantityShare}</p>
            </div>
          </div>
        </div>
      </div>
      <div className={index == 4 ? "noLine" : "line"}></div>
    </>
  );
};
export default Post;
