import React from "react";
import styles from "./navbar.module.scss";
import BassicVerifiedIcon from "../../../UI/VerifiedIcon";
import FollowButton from "../../../UI/Button";
import HeartIcon from "../../../UI/HeartIcon";
import ImageAvatars from "../../../UI/Avatar";
import Email from "../../../UI/Email";
import Travel from "../../../UI/Travel";
import Bag from "../../../UI/Bag";
import EditActionButtons from "../../../UI/EditIcon";
import { NavLink } from "react-router-dom";

const UserNavbar = ({ user }) => {
  const verifiedIconStyles = { width: "25px" };
  const avatarCustomStyles = { width: 140, height: 140 };
  return (
    <div className={styles.companyNavbar}>
      <div className={styles.companyCoverPhoto}>
        <img
          src="https://seekconz.corewebdna.net.au/web_images/blogs/216/1461/What%20is%20a%20cover%20letter_940x485.jpg"
          alt=""
        />
      </div>

      <div className={styles.companyInfo}>
        <div className={styles.companyPhoto}>
          <ImageAvatars
            photoURL={user?.photoURL}
            customStyles={avatarCustomStyles}
          />
        </div>
        <div className={styles.companyInfoBlock}>
          <div className={styles.companyName}>
            <h1>{user?.displayName}</h1>
            <BassicVerifiedIcon
              customStyles={verifiedIconStyles}
            ></BassicVerifiedIcon>
          </div>
          <div className={styles.titleList}>
            <div className={styles.lable}>
              <div className={styles.itemsWraper}>
                <Email color="customGreen" />
                <h3>{user?.email}</h3>
              </div>
            </div>
            <div className={styles.lable}>
              <div className={styles.itemsWraper}>
                <Travel color="customGreen" /> <span>No</span>
              </div>
              <div className={styles.itemsWraper}>
                <Bag color="customGreen" /> <span> No </span>{" "}
              </div>
            </div>
          </div>
        </div>
        <div className={styles.followBtn}>
          <div className={styles.itemsWraper}>
            <FollowButton size="small" variant="Follow">
              <HeartIcon variant="heart" /> Subscriptions
            </FollowButton>
            <NavLink to="/YourCv">
              <FollowButton variant="ViewMore">Convert CV to PDF</FollowButton>
            </NavLink>
          </div>
        </div>
        <div className={styles.userEdit}>
          <EditActionButtons />
        </div>
      </div>
    </div>
  );
};

export default UserNavbar;
