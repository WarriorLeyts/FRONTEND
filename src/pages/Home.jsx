import '../styles/App.css'
import Header from '../components/Header.jsx'
import Statistics from '../components/Statistics.jsx'
import Main from '../components/Main.jsx'
import AuthorizationFooter from '../components/AuthorizationFooter'
import RegModal from '../components/RegModal.jsx'
import AuthorModal from '../components/AuthorModal.jsx'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getFeedPage } from '@/store/userSlice'

const Home = () => {
  const dispath = useDispatch();
  const [active, setActive] = useState(false);
  const { isAuth, errorAuth } = useSelector((state) => state.user)
  
  useEffect(() => {
    dispath(getFeedPage());
  },[])

  useEffect(() => {
    if(isAuth){
      window.location.href = '/feed';
    }
    console.log(isAuth)
    console.log(errorAuth)
  }, [isAuth]);
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