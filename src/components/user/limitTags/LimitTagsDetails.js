import React from "react";
import styles from "./limitTags.module.scss";
const LimitTagsDetails = ({ item }) => {
  return (
    <div className={styles.details}>
      {" "}
      <span>{item.title}</span>
    </div>
  );
};

export default LimitTagsDetails;
