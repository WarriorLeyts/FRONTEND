import '@/styles/LastMessages.css';
import '@/styles/LastMessageList.css';
import { useEffect } from "react";
import Post from './Post';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPosts, clearDate } from '../store/postsSlice';

const PostsFeed = () => {
    const dispatch = useDispatch();
    const posts = useSelector((state) => state.posts.posts);
    const loading = useSelector((state) => state.posts.loading);
    const error = useSelector((state) => state.posts.error);
    const message = useSelector((state) => state.posts.message);
    
    useEffect(() => {
        dispatch(fetchPosts());
    }, [message]);
    
    const getPosts = () => {
        if (loading || error) {
            return posts?.map((post, index) => {
                   return (<>
                  <div className="post" key={`post_${index}`}>
                      <a className="avatar" href="#"><div className="post__avatar"  alt="" style={{backgroundImage: "none"}}></div></a>
                      <div className="user">
                          <div className="user-information">
                              <a href="#" className="user-information__user-name" ><div className="no-name"></div>         
                              <div className="no-mail"></div>
                              </a> 
                          </div>
                          <div className="user-message mg-rg">
                              <div className="no-message1"></div>
                              <div className="no-message2"></div>
                          </div>
                      </div>
                    </div>
                    <div className={index == 4 ? "noLine" : "line"}></div>
                    </>
                   )  
            })}

        return posts?.map((post, index) => 
         <Post key={`post_${index}`} post={post} index={index}/>
        )
    }
    return (
        <div className='lastMessages'>
            <h2 className="lastMessages__title">Последние сообщения</h2>
            <div className="LastMessageList"> 
            {getPosts()}
            </div>
        </div>
    )
}
export default PostsFeed;