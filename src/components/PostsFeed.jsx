import '@/styles/LastMessages.css';
import '@/styles/LastMessageList.css';
import useFetchStore from '@/store/fetch.js';
import { useEffect } from "react";
import getTimeString from '@/get_time_string.js';
import Post from './Post';

const PostsFeed = () => {
    const posts = useFetchStore ((state) => state.posts);
    const setPosts = useFetchStore ((state) => state.setPosts);
    useEffect(() => {
        setPosts()
        setInterval(() => setPosts(), 60000);
    }, []);
    const getPosts = () => {
        if (posts.join() === '1,2,3,4') {
            return posts.map((post, index) => {
                   return (<>
                  <div className="post" key={index + 'i'}>
                      <a className="avatar" href="#"><div className="post__avatar"  alt=""></div></a>
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

        return posts.map((post, index) => 
         <Post key={post.id} post={post} index={index}/>
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