import '../styles/App.css'
import Header from '../components/Header.jsx'
import Statistics from '../components/Statistics.jsx'
import Main from '../components/Main.jsx'
import AuthorizationFooter from '../components/AuthorizationFooter'
import RegModal from '../components/RegModal.jsx'
import AuthorModal from '../components/AuthorModal.jsx'

const Home  = () => {
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