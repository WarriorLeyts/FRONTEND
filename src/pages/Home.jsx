import '../styles/App.css'
import Header from '../components/Header.jsx'
import Statistics from '../components/Statistics.jsx'
import Main from '../components/Main.jsx'
import AuthorizationFooter from '../components/AuthorizationFooter'
import RegModal from '../components/RegModal.jsx'
import AuthorModal from '../components/AuthorModal.jsx'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { isLogged } from '@/store/userSlice'
import { useNavigate } from 'react-router-dom'

const Home  = () => {
  const dispath = useDispatch();
  const navigate = useNavigate();
  const [active, setActive] = useState(false);
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn)

  useEffect(() => {
    if(isLoggedIn){
      navigate('/feed')
    }
  }, [isLoggedIn])
  dispath(isLogged());
  return (
    <>
      <Header setActive={setActive}/>
      <Statistics />
      <Main />
      <AuthorizationFooter setActive={setActive}/>
      <RegModal active={active} setActive={setActive}/>
      <AuthorModal active={active} setActive={setActive}/>
    </>
  )
}

export default Home;