import "../styles/App.css";
import Header from "../components/Header.jsx";
import Statistics from "../components/Statistics.jsx";
import Main from "../components/Main.jsx";
import AuthorizationFooter from "../components/AuthorizationFooter";
import RegModal from "../components/RegModal.jsx";
import AuthorModal from "../components/AuthorModal.jsx";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFeedPage } from "@/store/userSlice";
import { fetchPosts } from "../store/postsSlice";

const Home = () => {
  const dispath = useDispatch();
  const posts = useSelector((state) => state.posts.homePosts);
  const { isAuth } = useSelector((state) => state.user);
  
  useEffect(() => {
    if (posts.length === 0) {
      dispath(fetchPosts());
    }
    dispath(getFeedPage());
  }, []);
  useEffect(() => {
    if (isAuth) {
      window.location.href = "/feed";
    }
  }, [isAuth]);
  return (
    <>
      <Header />
      <Statistics />
      <Main posts={posts}/>
      <AuthorizationFooter  />
      <RegModal />
      <AuthorModal />
    </>
  );
};

export default Home;
