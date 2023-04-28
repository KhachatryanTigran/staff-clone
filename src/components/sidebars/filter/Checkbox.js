import React from "react";
import { useSelector } from "react-redux";
import styles from "../sidebars.module.scss";

const Checkbox = ({ countJobs, name, onChange, categoryType, ...props }) => {
  const isChecked = useSelector((state) =>
    state.filterSlice[categoryType].find((item) => name === item)
  );

  return (
    <div className={styles.filterCategoryLevel}>
      <label className={styles.checkboxLabel}>
        <input
          onChange={(e) => onChange(name, e)}
          type="checkbox"
          checked={!!isChecked}
        />
        <div className={styles.filterCategoryLevelName}>
          <span className={styles.coloredText}> {name}</span>
          <span> ({countJobs})</span>
        </div>
      </label>
    </div>
  );
};

export default Checkbox;
