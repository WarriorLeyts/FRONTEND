import '@/styles/Header.css';
import Authorization from '@/components/Authorization.jsx';

const Header = () => {
    return (
        <div className='bgHeader'>
            <header>
                <Authorization /> 
                <div className='img-friends'></div>
            </header>
        </div>
    )
}
export default Header;