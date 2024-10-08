import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import styles from "@/styles/settingsPage.module.css";
import NavSetting from "@/components/NavSetting";
import { useLocation } from "react-router-dom";
import ProfileSettings from "@/components/ProfileSettings";

function ProfileSettingsPage() {
  const location = useLocation();
  return (
    <>
      <Navbar location={location.pathname} />
      <main className={styles.mainSetting}>
        <div className={styles.blockSetting}>
          <h2 className={styles.title}>Редактировать профиль</h2>
          <div className={styles.settings}>
            <ProfileSettings />
            <NavSetting location={location.pathname} />
          </div>
        </div>
      </main>
      <Footer location={location.pathname} />
    </>
  );
}

export default ProfileSettingsPage;
