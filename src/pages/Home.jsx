import '../styles/App.css'
import Header from '../components/Header.jsx'
import Statistics from '../components/Statistics.jsx'
import Main from '../components/Main.jsx'
import AuthorizationFooter from '../components/AuthorizationFooter'
import RegModal from '../components/RegModal.jsx'
import AuthorModal from '../components/AuthorModal.jsx'
import { useNavigate } from 'react-router-dom'

const Home  = () => {
  const navigate = useNavigate()
  const getHome = async () => {
    const responseData = await fetch('/feed');
    if (responseData.status === 200) {
      console.log(responseData)
      return navigate('/feed')
    }
    console.log(responseData)
    return 
  };
  getHome()
  return (
    <>
      <Header />
      <Statistics />
      <Main />
      <AuthorizationFooter/>
      <RegModal/>
      <AuthorModal/>
    </>
  )
}

export default Home;