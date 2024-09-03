import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import styles from '@/styles/settingsPage.module.css'
import NavSetting from "@/components/NavSetting";
import { useLocation } from "react-router-dom";
import EmailSettings from "@/components/EmailSettings";

function EmailSettingPage() {
  const location= useLocation();
    return (
      <div>
          <Navbar location={location.pathname}/>
        <main className={styles.mainSetting}>
        <div className={styles.blockSetting}>
          <h2 className={styles.title}>Сменить e-mail</h2>
          <div className={styles.settings}>
            <EmailSettings />
            <NavSetting location={location.pathname}/>
        </div>
        </div>
        </main>
        <Footer location={location.pathname}/>
      </div>
    );
  }
  
export default EmailSettingPage;