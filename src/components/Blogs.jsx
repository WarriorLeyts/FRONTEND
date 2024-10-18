import "@/styles/Blogs.css";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchBlogs } from "../store/blogsSlice";
import BlogItem from "./BlogItem";
const Blogs = () => {
  const dispatch = useDispatch();
  const blogs = useSelector((state) => state.blogs.blogs);
  const loading = useSelector((state) => state.blogs.loading);
  const error = useSelector((state) => state.blogs.error);

  useEffect(() => {
    if (!blogs.length) {
      dispatch(fetchBlogs());
    }
  }, []);

  const getBlogs = () => {
    if (loading || error) {
      return [1, 2, 3].map((item) => {
        return (
          <li className="blogs-item" key={`blog_${item}`}>
            <div className="blog-icon"> </div>
            <div className="blog-info">
              <div className="no-blog"></div>
              <div className="no-blog-sub"></div>
            </div>
            <div className="no-blog-btn" href="#"></div>
          </li>
        );
      });
    }
    return blogs.map((blog, index) => {
      return <BlogItem key={index} blog={blog} />
    });
  };
  return (
    <>
      <div className="blogs">
        <h4 className="blogs__title">Интересные блогеры</h4>
        <ul className="blogs-items">{getBlogs()}</ul>
      </div>
    </>
  );
};
export default Blogs;
