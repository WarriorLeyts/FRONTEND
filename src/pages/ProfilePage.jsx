import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLocation } from "react-router-dom";
function ProfilePage() {
  const location = useLocation();
    return (
      <div>
        <Navbar location={location.pathname}/>
        <h1>Profile Page</h1>
        <p>This is a placeholder for the Profile Page.</p>
        <Footer location={location.pathname}/>
      </div>
    );
  }
  
export default ProfilePage;