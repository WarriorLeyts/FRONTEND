import '@/styles/Main.css';
import PostsFeed from '@/components/PostsFeed';
import TopicsBlogs from '@/components/TopicsBlogs.jsx';
const Main = () => {
    return (
        <main className='mainHome'>
            <PostsFeed/>
            <TopicsBlogs/>
        </main>
    )
}
export default Main;