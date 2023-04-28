import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router";

import { addfilteredJobsData } from "../../store/slices/jobsSlice";
import Button from "../../UI/Button";
import SearchTextField from "../../UI/TextField";

import styles from "./sidebars.module.scss";
const Search = () => {
  const location = useLocation().pathname;
  const [value, setValue] = useState();
  const onChange = (value) => {
    setValue(value);
  };
  const dispatch = useDispatch();

  const jobsData = useSelector((state) => state.jobsSlice.jobsData);
  const companyData = useSelector((state) => state.jobsSlice.companyData);
  const filtredJobsData = useSelector(
    (state) => state.jobsSlice.filtredJobsData
  );

  let titleText =
    location === "/companies"
      ? "Search all staff.am companies"
      : "Search all staff.am jobs";
  const onClick = () => {
    if (location === "/companies") {
    } else {
      dispatch(
        addfilteredJobsData(
          jobsData.reduce((acc, job) => {
            if (
              job.item.jobName.includes(value) ||
              job.item.level.includes(value) ||
              job.item.jobCategory.includes(value)
            ) {
              acc.push(job);
            }
            return acc;
          }, [])
        )
      );
    }
  };

  return (
    <div className={styles.searchSidebar}>
      <div className={styles.searchSidebarBlock}>
        <h1>{titleText}</h1>

        <SearchTextField onChange={onChange} value={value} />

        <div className={styles.searchButton}>
          <Button size="small" variant="solid" onClick={onClick}>
            Search
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Search;
