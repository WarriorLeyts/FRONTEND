import React from 'react'
import "@/styles/Blogs.css";
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { toggleSubscription, addSubscription, 
        deleteSubscription, upSubscriptions, upFollowers,
        addUserFollowers, deleteUserFollowers } from '@/store/subscriptions';
import { upFeedPosts } from '@/store/postsSlice';
import { updateUserInfo, updateOtherProfile } from '@/store/profileSlice';
import { upBlogs } from '@/store/blogsSlice';

export default function BlogItem({ blog }) {
    const dispatch = useDispatch();
    const { loading } = useSelector((state) => state.blogs);
    const { userInfo } = useSelector((state) => state.profile);
    const { otherProfile } = useSelector((state) => state.profile);

    const handleUpSubscriptions = () => {
      const value = (blog.subscriptionMessage === 'Читать') ? 'Читаю' : 'Читать';
      dispatch(toggleSubscription(blog.id));

      if (blog.subscriptionMessage === 'Читать') {
        dispatch(addSubscription({ ...blog, subscriptionMessage: value }));
        dispatch(addUserFollowers({...userInfo, subscriptionMessage: 'Читать'}));
        
      } else {
          dispatch(deleteSubscription(blog));
          dispatch(deleteUserFollowers(userInfo));
        }

      dispatch(upFeedPosts({ id: blog.id, subscriptionMessage: 'Читаю' }));

      dispatch(updateUserInfo({
        countFolloweds: blog.subscriptionMessage === 'Читаю' ?
        userInfo.countFolloweds - 1 : userInfo.countFolloweds + 1,
      }));
      dispatch(upSubscriptions({ id: blog.id, subscriptionMessage: value }));
      dispatch(upFollowers({ id: blog.id, subscriptionMessage: value }));
      dispatch(upBlogs({...blog,  subscriptionMessage: value }));

      dispatch(updateOtherProfile({ 
        countFollowers: blog.subscriptionMessage === 'Читаю' ?
        otherProfile?.countFollowers - 1 : otherProfile?.countFollowers + 1,
      })) 
    }
    
  return (
    <li className="blogs-item">
        <Link to={`/profile/${blog.id}`} style={{ display: 'flex' }}>
          <div className="blog-icon"
          style={{ backgroundImage: `url(${blog.avatar || ""})` }}
          ></div>
          <div className="blog-info">
          <p className="blog-name">{blog.name}</p>
          <span className="blog-sub">{blog.nickname}</span>
          </div>
        </Link>
      {blog.id !== userInfo?.id && <button className={ blog.subscriptionMessage === 'Читаю' ? 'blogs__btnAct blogs__btn': 'blogs__btn'}
          disabled={loading}
          onClick={() => handleUpSubscriptions()}
        >{blog.subscriptionMessage}</button>}
  </li>
  )
}
