import "@/styles/LastMessages.css";
import "@/styles/LastMessageList.css";
import Post from "./Post";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";


const PostsFeed = ({ posts }) => {
  const location = useLocation();
  const loading = useSelector((state) => state.posts.loading);

  const getPosts = () => {
    if (loading) {
      return [1, 2, 3, 4].map((item) => {
        return (
          <>
            <div className="post" key={`post_${item}`}>
              <a className="avatar" href="#">
                <div
                  className="post__avatar"
                  alt=""
                  style={{ backgroundImage: "none" }}
                ></div>
              </a>
              <div className="user">
                <div className="user-information">
                  <a href="#" className="user-information__user-name">
                    <div className="no-name"></div>
                    <div className="no-mail"></div>
                  </a>
                </div>
                <div className="user-message mg-rg">
                  <div className="no-message1"></div>
                  <div className="no-message2"></div>
                </div>
              </div>
            </div>
            <div className={item == 4 ? "noLine" : "line"}></div>
          </>
        );
      });
    }

    return posts?.map((post, index) => (
      <Post key={`post_${index}`} post={post} index={index} />
    ));
  };
  
  return (
    <div className="lastMessages">
      {location.pathname === "/" && (
        <h2 className="lastMessages__title">Последние сообщения</h2>
      )}
      <div className="LastMessageList">{getPosts()}</div>
    </div>
  );
};
export default PostsFeed;
