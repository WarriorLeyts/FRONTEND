import '../styles/App.css'
import Header from '../components/Header.jsx'
import Statistics from '../components/Statistics.jsx'
import Main from '../components/Main.jsx'
import AuthorizationFooter from '../components/AuthorizationFooter'
import RegModal from '../components/RegModal.jsx'
import AuthorModal from '../components/AuthorModal.jsx'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { isLogged } from '@/store/userSlice'

const Home  = () => {
  const dispath = useDispatch()
  const [active, setActive] = useState(false);
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