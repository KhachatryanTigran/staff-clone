import React from "react";
import Button from "@mui/material/Button";
import SearchIcon from "@mui/icons-material/Search";
import styles from "../../pages/Home.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { v4 as uuid } from "uuid";
import { COMPANY__INDUSTRIES } from "../../constants/category";
import { PATHNAME } from "../../constants/pathname";
import { emptyFilter, setFilter } from "../../store/slices/filterSlice";

export function WrapperCompany() {
  const { companies } = PATHNAME;
  const dispatch = useDispatch();
  const industry = useSelector(
    (state) => state.filterSlice.industryCategoryCompany
  );
  const value = String(industry);

  const onClickButton = async (value) => {
    if (industry.length > 0) {
      dispatch(emptyFilter({ category: COMPANY__INDUSTRIES.categoryType }));
    }

    dispatch(
      setFilter({
        value: value,
        category: COMPANY__INDUSTRIES.categoryType,
      })
    );
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.fields_company}>
        <select value={value} onChange={(e) => onClickButton(e.target.value)}>
          <option value>All Industries </option>

          {COMPANY__INDUSTRIES.data.map((item) => (
            <option value={item} key={uuid()}>
              {item}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.fields}>
        <Link to={companies}>
          <Button className={styles.searchbtn} variant="contained">
            <SearchIcon />
          </Button>
        </Link>
      </div>
    </div>
  );
}
