import React, { useRef } from "react";
import { Widget } from "@uploadcare/react-widget";
import styles from "../styles/postWriter.module.css";

export default function AddPhoto({ setImgUrl }) {
  const widgetRef = useRef(null);

  const handleFileUpload = (fileInfo) => {
    setImgUrl(fileInfo.cdnUrl);
  };
  
  const handleImageClick = () => {
    if (widgetRef.current) {
      widgetRef.current.openDialog();
    }
  };

  return (
    <div>
      <div style={{ display: "none" }}>
        <Widget
          publicKey="270c79de8a370c17580f"
          onChange={handleFileUpload}
          ref={widgetRef}
        />
      </div>
      <div className={styles.addPhoto} onClick={handleImageClick}>
        <svg
          width="25"
          height="21"
          viewBox="0 0 25 21"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          alt="Upload"
        >
          <path
            className={styles.addPhotoCamera}
            d="M15.8162 12.3526C15.8162 14.2725 14.3326 15.8266 12.5 15.8266C10.6674 15.8266 9.18378 14.2725 9.18378 12.3526C9.18378 10.4328 10.6674 8.87862 12.5 8.87862C14.3326 8.87862 15.8162 10.4328 15.8162 12.3526ZM22.6027 3.6461C23.9271 3.6461 25 4.77004 25 6.15749V12.7398V18.3219C25 19.8008 23.8552 21 22.4435 21H2.55647C1.14476 21 0 19.8008 0 18.3219V12.7344V6.15749C0 4.77004 1.0729 3.6461 2.39733 3.6461H7.19199L7.41786 2.64584C7.76181 1.09705 9.08111 0 10.6006 0H14.4045C15.924 0 17.2433 1.09705 17.5873 2.64584L17.808 3.6461H22.6027ZM5 7.27068C5 6.57695 4.46099 6.01229 3.79877 6.01229C3.13142 6.01229 2.5924 6.57695 2.5924 7.27068C2.5924 7.9644 3.13142 8.52907 3.79363 8.52907C4.46099 8.53444 5 7.96978 5 7.27068ZM18.4138 12.3526C18.4138 8.93239 15.7649 6.15749 12.5 6.15749C9.23511 6.15749 6.58624 8.93239 6.58624 12.3526C6.58624 15.7729 9.23511 18.5478 12.5 18.5478C15.7649 18.5478 18.4138 15.7729 18.4138 12.3526Z"
            fill="#0057FF"
          />
        </svg>
      </div>
    </div>
  );
}
