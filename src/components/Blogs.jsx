import '@/styles/Blogs.css';
import { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { fetchBlogs } from '../store/blogsSlice';

const Blogs = () => {
  const dispatch = useDispatch();
  const blogs = useSelector((state) => state.blogs.blogs);
  const loading = useSelector((state) => state.blogs.loading);
  const error = useSelector((state) => state.blogs.error);

    useEffect(() => {
      dispatch(fetchBlogs())
    }, []);

    const getBlogs = () => {
      if (loading || error) {
        return blogs.map((item, index) => {
          return (
            <li className="blogs-item" key={`blog_${index}`}>
              <div className="blog-icon"> </div>
              <div className="blog-info">
                <div className="no-blog"></div>
                <div className="no-blog-sub"></div>
              </div>
              <div className="no-blog-btn" href="#"></div>
            </li>
          )
        })
      } 
      return blogs.map((item, index) => {
        return (
          <li className="blogs-item" key={`blog_${index}`}>
            <img src= {`${item.urlPictures}`} alt="" className="blog-icon"/>
          <div className="blog-info">
            <p className="blog-name">{item.name}
            </p>
            <span className="blog-sub">{item.mail}</span>
            </div>
          <a className="blogs__btn" href="#">Читать</a>
          </li>
        )
      })
    }
    return (
      <>
    <div className="blogs">
    <h4 className="blogs__title">Интересные блогеры</h4>
    <ul className="blogs-items">
      {getBlogs()}
    </ul>
    </div>
    </>        
    )
}
export default Blogs;