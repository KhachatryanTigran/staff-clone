import React from "react";
import styles from "./contacts.module.scss";

import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import LocalPhoneOutlinedIcon from "@mui/icons-material/LocalPhoneOutlined";
import { Avatar } from "@mui/material";
import Maps from "../../map/Maps";

const Contacts = ({ contacts }) => {
  return (
    <div className={styles.contactsBlock}>
      <h2>Contacts</h2>
      <div className={styles.contacts}>
        <div className={styles.contactInfo}>
          <div>
            <Avatar className={styles.avatar}>
              <LocationOnOutlinedIcon />
            </Avatar>
            <p>{contacts?.address}</p>
          </div>

          <div>
            <Avatar className={styles.avatar}>
              <EmailOutlinedIcon />
            </Avatar>
            <p>{contacts?.email}</p>
          </div>

          <div>
            <Avatar className={styles.avatar}>
              <LocalPhoneOutlinedIcon />
            </Avatar>
            <p>{contacts?.phone}</p>
          </div>
        </div>
        <div className={styles.map}>
          <Maps value={contacts?.address} />
        </div>
      </div>
    </div>
  );
};

export default Contacts;
