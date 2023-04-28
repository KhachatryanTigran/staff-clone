import React from "react";
import styles from "../sidebars.module.scss";
const Title = ({ children, filterTitle }) => {
  return (
    <div className={styles.categoriesFilterTitle}>
      <h2>{filterTitle}</h2>
      <div className={styles.categoriesCheckboxes}>{children}</div>
    </div>
  );
};

export default Title;
