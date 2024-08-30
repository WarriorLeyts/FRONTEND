import React from 'react'
import NavbarList from './NavbarList'
import styles from '../styles/FeedPage.module.css';

export default function ({ location }) {
  let location1 = location;
  return (
    <header className={styles.header}>
    <div className={styles.navbar}><NavbarList location={location1}/></div>
    <svg className={styles.logo} width="21" height="23" viewBox="0 0 36 38" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path className={styles.logoPath} d="M35.5856 14.8369C35.0908 15.3634 34.3619 15.3634 34.1223 15.3634C33.6781 15.3634 33.1288 15.2895 32.3417 15.1238C31.7235 14.9937 31.1911 14.8639 30.7217 14.7496C29.7982 14.5244 29.1308 14.3617 28.5026 14.3617C28.1484 14.3617 27.5023 14.5157 26.8181 14.6788C25.7528 14.9328 24.4271 15.2488 23.1447 15.2488C21.8501 15.2488 20.4874 15.1478 19.6288 15.0698C19.3436 16.1428 18.6651 17.9122 17.1251 19.1787C15.0313 20.9005 13.479 21.6685 13.4139 21.7004C13.0162 21.895 12.5381 21.793 12.2539 21.4527C11.9698 21.1126 11.9528 20.6221 12.213 20.2632C12.2216 20.251 13.268 18.7662 13.2278 17.0976C13.2119 16.4338 13.1879 15.9137 13.1634 15.5175C11.8592 15.9034 9.63869 16.7659 8.49324 18.3895C6.75806 20.8488 6.04622 24.635 6.23689 25.8771C6.43539 27.1712 6.45915 27.1712 7.07097 27.1712C8.40401 27.1712 9.5239 27.226 10.7853 27.9152C11.9011 28.5246 12.5156 29.1914 12.5819 29.2655C12.8321 29.5445 12.8987 29.9437 12.7528 30.2892C12.6068 30.635 12.2746 30.8645 11.9008 30.8779C11.5403 30.8915 10.4493 30.9827 9.74809 31.2381C9.37573 31.3738 9.05499 31.5326 8.74478 31.6862C8.24852 31.932 7.77973 32.1641 7.23288 32.2289C7.05505 32.25 6.87246 32.2603 6.69964 32.2571C6.49805 32.7271 6.15497 33.2873 5.57794 33.7318C5.13625 34.0721 4.68685 34.2821 4.29036 34.4671C3.80347 34.6946 3.41879 34.8742 3.12347 35.2418C2.34948 36.2051 2.08973 37.2496 2.08729 37.26C1.98611 37.6772 1.62223 37.9795 1.19491 37.999C1.18015 37.9997 1.16525 38 1.15049 38C0.740768 38 0.373161 37.7407 0.239498 37.3484C0.179278 37.1723 -0.328283 35.5576 0.347224 33.1943C0.588743 32.3494 0.962898 31.618 1.3246 30.9105C1.91318 29.7598 2.42151 28.7661 2.20824 27.5484C1.2057 21.8251 1.27491 17.1716 2.41381 13.7176C4.18469 8.3457 8.47167 5.35267 9.31307 4.80741C9.7305 4.53665 10.1062 4.2985 10.4228 4.10055C10.1292 3.86575 9.75592 3.61909 9.31217 3.42978C8.30219 2.99883 7.8777 2.88104 7.76009 2.85295C7.75251 2.85321 7.74519 2.85321 7.73787 2.85321C7.31865 2.85334 6.99637 2.57549 6.87375 2.16517C6.74638 1.73912 6.98301 1.28175 7.36449 1.05558C7.43703 1.01241 9.17209 0 11.4587 0C11.9306 0 12.3994 0.0434296 12.852 0.129129C14.2622 0.396279 15.2588 0.795393 16.2226 1.18123C17.1636 1.55805 18.0526 1.914 19.3797 2.19455C20.0244 2.33089 20.6181 2.43605 21.1922 2.53786C23.1673 2.88788 24.8731 3.19021 27.4235 4.49735C30.7521 6.2036 32.6238 8.07043 32.6939 9.75362C32.7087 10.1084 32.701 10.4254 32.6707 10.704C32.9822 10.8604 33.3607 11.0579 33.743 11.2762C35.2996 12.1648 35.9524 12.8303 35.9959 13.573C36.0261 14.0897 35.8881 14.5149 35.5856 14.8369Z" fill="#FFFFFF"/>
    </svg>
    <img className={styles.avatarDecst}src='../img/alexsandr-avatar.png'/>
  </header>
  )
}
