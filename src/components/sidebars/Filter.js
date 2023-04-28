import React from "react";
import Clear from "./filter/Clear";
import styles from "./sidebars.module.scss";
import { v4 as uuid } from "uuid";

import {
  LEVEL_CATEGORY,
  JOB__CATEGORY,
  LEVEL__CATEGORY__COMPANY,
  COMPANY__INDUSTRIES,
  CITIES,
} from "../../constants/category";
import CategoryItem from "./filter/CategoryItem";
import { useLocation } from "react-router";

const Filter = () => {
  const pathname = useLocation().pathname;

  let categoryTypes =
    pathname === "/jobs"
      ? [LEVEL_CATEGORY, JOB__CATEGORY, CITIES]
      : [LEVEL__CATEGORY__COMPANY, COMPANY__INDUSTRIES];

  return (
    <div className={styles.filterSidebar}>
      <div className={styles.filterCategories}>
        <Clear />
        {categoryTypes.map((category) => (
          <CategoryItem filterData={category} key={uuid()} />
        ))}
      </div>
    </div>
  );
};

export default Filter;
