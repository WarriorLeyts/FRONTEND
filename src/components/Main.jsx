import "@/styles/Main.css";
import PostsFeed from "@/components/PostsFeed";
import TopicsBlogs from "@/components/TopicsBlogs.jsx";
const Main = ({ posts }) => {
  const posts1 = posts;
  
  return (
    <main className="mainHome">
      <PostsFeed posts={ posts1 }/>
      <TopicsBlogs />
    </main>
  );
};
export default Main;
