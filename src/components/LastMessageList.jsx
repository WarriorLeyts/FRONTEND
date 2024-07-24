import '@/styles/LastMessageList.css';
import useFetchStore from '@/store/fetch.js';
import { useEffect } from "react";
import getTimeString from '@/get_time_string.js';

const LastMessageList = () => {
  let posts = [1, 2, 3, 4];
  const noLine = {
    display: 'none',
  };
  const resPosts = useFetchStore ((state) => state.posts);
  const setPosts = useFetchStore ((state) => state.setPosts);
  useEffect(() => {
    setPosts();
  }, []);
  let body = <div className="LastMessageList">
  { posts.map((item) => {
      return (
        <>
      <div className="post" id={`post_${item}`}>
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
        <div className={item == 4 ? noLine : "line"}></div>
        </>)   
  })}

</div>; 
  const body2 = <div className="LastMessageList">
  { resPosts.map((item, index) => {
      return (
        <>
        <div key={posts[index]} className="post" id={`post_${index}`}>
        <a className="avatar" href="#"><img className="post__avatar" src={`${item.avatar}`} alt=""/></a>
      <div className="user">
          <div className="user-information">
              <a href="#" className="user-information__user-name" >
              {item.name}<span className="mail">{item.email}</span>
              </a> 
              <div className="user-information__time-message">
              <p>{getTimeString(item.date, new Date())}</p>
              </div>
          </div>
          <div className="user-message mg-rg">
          <p>{item.message}</p>
          {(()=> {
            if (typeof item.message_img !== 'undefined') {
              return <img className="message-img" src={item.message_img}/>
            }
            return 
          })()}
          </div>
          <div className="user-interaction">
           <div className="user-interaction__item">
              <a href=""><svg  className="user-interaction__icon" width="15" height="11" viewBox="0 0 15 11" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path  d="M4.6875 0.8125L1.40625 4.5625M1.40625 4.5625L4.6875 8.3125M1.40625 4.5625H8.4375C12.1875 4.5625 14.0625 6.4375 14.0625 10.1875" stroke="#ABACB1" strokeLinecap="round" strokeLinejoin="round"/>
              </svg></a>
              <p>{item.quantityReposts}</p>
            </div>
            <div className="user-interaction__item">
              <a href=""><svg className="user-interaction__favs" width="15" height="13" viewBox="0 0 15 13" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path  d="M1.875 6.5C0.46875 4.625 0.9375 1.8125 3.28125 0.875C5.625 -0.0624999 7.03125 1.8125 7.5 2.75C7.96875 1.8125 9.84375 -0.0624999 12.1875 0.875C14.5312 1.8125 14.5312 4.625 13.125 6.5C11.7187 8.375 7.5 12.125 7.5 12.125C7.5 12.125 3.28125 8.375 1.875 6.5Z" stroke="#ABACB1" strokeLinecap="round" strokeLinejoin="round"/>
              </svg></a>
              <p>{item.quantityLike}</p>
            </div>
            <div className="user-interaction__item">
              <a href=""><svg className="user-interaction__icon" width="13" height="14" viewBox="0 0 13 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path  d="M12.125 9.3125V13.0625H0.875V9.3125M6.5 0.875V10.25M6.5 0.875L2.75 4.625M6.5 0.875L10.25 4.625" stroke="#ABACB1" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              </a>
              <p>{item.quantityShare}</p>
            </div>
          </div>

        </div>
        </div>
        <div className={index == 3 ? noLine : "line"}></div>
        </>
        )
      
      })}

</div>;  
  body = Object.keys(resPosts).length ? body2 : body;
return (
  <>
  {body}
  </>
  )
  }
export default LastMessageList