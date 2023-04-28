import React from "react";
import styles from "./pdfNavbar.module.scss";
import ImageAvatars from "../../../UI/Avatar";
import Email from "../../../UI/Email";

const PDFNavbar = ({ user }) => {
  const avatarCustomStyles = { width: 140, height: 140 };
  return (
    <div className={styles.companyNavbar}>
      <div className={styles.companyInfo}>
        <div className={styles.companyPhoto}>
          <ImageAvatars
            photoURL={user?.photoURL}
            customStyles={avatarCustomStyles}
          />
        </div>
        <div className={styles.companyInfoBlock}>
          <div className={styles.companyName}>
            <h1>{user?.displayName ? user?.displayName : "Name"}</h1>
          </div>
          <div className={styles.titleList}>
            <div className={styles.lable}>
              <div className={styles.itemsWraper}>
                <Email />
                <h3>{user?.email}</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PDFNavbar;
