import React from "react";
import styles from "./autocompleteLevelSlider.module.scss";
const LevelSliderDetails = ({ item }) => {
  return (
    <div className={styles.details}>
      {" "}
      <span>{item.value}</span> <span> {" / " + item.level}</span>
    </div>
  );
};

export default LevelSliderDetails;
