import '@/styles/Blogs.css';
import useFetchStore from '@/store/fetch.js';
import { useEffect } from "react";
const Blogs = () => {
    const arrBlogs = [1, 2, 3, 4]
    const resBlogs = useFetchStore ((state) => state.blogs);
    const setBlogs = useFetchStore ((state) => state.setBlogs);
    useEffect(() => {
      setBlogs();
    }, []);
    let body = <div className="blogs">
    <h4 className="blogs__title">Интересные блогеры</h4>
    <ul className="blogs-items">
        {arrBlogs.map((item) => {
          return (
            <li className="blogs-item" id={`blog_${item}`}>
              <div className="blog-icon"> </div>
              <div className="blog-info">
                <div className="no-blog"></div>
                <div className="no-blog-sub"></div>
              </div>
              <div className="no-blog-btn" href="#"></div>
            </li>
          )
        })}
    </ul>
</div>
const body2 = <div className="blogs">
<h4 className="blogs__title">Интересные блогеры</h4>
<ul className="blogs-items">
    {resBlogs.map((item, index) => {
      return (
        <li className="blogs-item" id={`blog_${index}`}>
          <img src= {`${item.urlPictures}`} alt="" className="blog-icon"/>
        <div className="blog-info">
          <p className="blog-name">{item.name}
          </p>
          <span className="blog-sub">{item.mail}</span>
          </div>
        <a className="blogs__btn" href="#">Читать</a>
        </li>
      )
    })}
</ul>
</div>
  body = Object.keys(resBlogs).length ? body2 : body;
    return (
      <>
    {body}
    </>        
    )
}
export default Blogs;