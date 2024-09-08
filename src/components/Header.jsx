import '@/styles/Header.css';
import Authorization from '@/components/Authorization.jsx';

const Header = ({ setActive }) => {
    const setActive1 = setActive;
    return (
        <div className='bgHeader'>
            <header>
                <Authorization setActive={setActive1}/> 
                <div className='img-friends'></div>
            </header>
        </div>
    )
}
export default Header;