import '@/styles/TopicsBlogs.css';
import Topics from '@/components/Topics.jsx';
import Blogs from '@/components/Blogs.jsx';
const TopicsBlogs = () => {
    return (
        <div className='topics-blogs'>
            <Topics />
            <Blogs />
        </div>
    )
}
export default TopicsBlogs;