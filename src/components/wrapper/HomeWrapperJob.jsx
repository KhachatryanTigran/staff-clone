import React from "react";
import Button from "@mui/material/Button";
import SearchIcon from "@mui/icons-material/Search";

import styles from "../../pages/Home.module.scss";
import { useDispatch, useSelector } from "react-redux";

import { v4 as uuid } from "uuid";
import { JOB__CATEGORY, LEVEL_CATEGORY } from "../../constants/category";

import { Link } from "react-router-dom";
import { PATHNAME } from "../../constants/pathname";
import { emptyFilter, setFilter } from "../../store/slices/filterSlice";

export function WrapperJob() {
  const { jobs } = PATHNAME;
  const dispatch = useDispatch();
  const category = useSelector((state) => state.filterSlice.jobCategory);
  const level = useSelector((state) => state.filterSlice.levelCategory);
  const value = String(category);
  const lev = String(level);
  const onClickButton = (value) => {
    if (category.length > 0) {
      dispatch(emptyFilter({ category: JOB__CATEGORY.categoryType }));
    }

    dispatch(setFilter({ value: value, category: JOB__CATEGORY.categoryType }));
  };

  const onClick = (value) => {
    if (level.length > 0) {
      dispatch(emptyFilter({ category: LEVEL_CATEGORY.categoryType }));
    }

    dispatch(
      setFilter({ value: value, category: LEVEL_CATEGORY.categoryType })
    );
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.fields}>
        <select value={value} onChange={(e) => onClickButton(e.target.value)}>
          <option>All Categories</option>

          {JOB__CATEGORY.data.map((item) => (
            <option value={item} key={uuid()}>
              {item}
            </option>
          ))}
        </select>
      </div>
      <div className={styles.fields}>
        <div className={styles.city}>
          <select value={lev} onChange={(e) => onClick(e.target.value)}>
            <option>All Levels</option>
            {LEVEL_CATEGORY.data.map((item) => (
              <option value={item} key={uuid()}>
                {item}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className={styles.fields}>
        <Link to={jobs}>
          <Button className={styles.searchbtn} variant="contained">
            <SearchIcon />
          </Button>
        </Link>
      </div>
    </div>
  );
}
