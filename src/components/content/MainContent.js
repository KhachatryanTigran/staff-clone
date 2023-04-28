import React, { useEffect, useState } from "react";

import JobItem from "./JobItem";
import Navbar from "./Navbar";
import styles from "./contents.module.scss";
import { useLocation } from "react-router";
import { v4 as uuid } from "uuid";

import {
  useGetFiltredCompaniesQuery,
  useGetFiltredINQuery,
} from "../../store/slices/dataControlRTKQ";

import { where } from "firebase/firestore";
import { useDispatch, useSelector } from "react-redux";

import Selectlimit from "../../UI/Selectlimit";

import LinearColor from "../../UI/Progress";

import CompanyItem from "../company/companyItem/CompanyItem";
import { SwiperComponent } from "../swiper/Swiper";
import { addCompaniesData, addJobsData } from "../../store/slices/jobsSlice";
import { PATHNAME } from "../../constants/pathname";

const MainContent = () => {
  const { jobs } = PATHNAME;
  const [limit, setLimit] = useState();
  const location = useLocation().pathname;
  const dispatch = useDispatch();
  const handleChange = (value) => {
    setLimit(value);
  };

  const levelCategory = useSelector((state) => state.filterSlice.levelCategory);
  const jobCategory = useSelector((state) => state.filterSlice.jobCategory);
  const industry = useSelector(
    (state) => state.filterSlice.industryCategoryCompany
  );
  const jobsData = useSelector((state) => state.jobsSlice.jobsData);
  const companyData = useSelector((state) => state.jobsSlice.companyData);

  const filterHints = jobCategory.length
    ? [where("jobCategory", "in", jobCategory)]
    : levelCategory.length
    ? [where("level", "in", levelCategory)]
    : [];

  const filterHintsCompany = industry.length
    ? [where("industry", "in", industry)]
    : [];

  const { data, isLoading } = useGetFiltredINQuery({
    limits: limit,
    filterHints,
  });

  const { data: comData, isLoading: loading } = useGetFiltredCompaniesQuery({
    limits: limit,
    filterHintsCompany,
  });

  useEffect(() => {
    dispatch(addCompaniesData(comData));
  }, [comData, dispatch]);

  useEffect(() => {
    let filtredJobs = data;
    try {
      if (jobCategory.length && levelCategory.length && data) {
        filtredJobs = data.filter((value) =>
          levelCategory.includes(value.item.level)
        );
      }
      dispatch(addJobsData(filtredJobs));
    } catch (e) {
      console.log(e);
    }
  }, [data, jobCategory, levelCategory, dispatch]);

  const getData = () => {
    if (location !== "/companies") {
      return jobsData?.map((job) => (
        <JobItem item={job?.item} id={job?.id} key={uuid()} />
      ));
    }
    return companyData?.map((c) => (
      <CompanyItem item={c?.item} id={c?.id} key={uuid()} />
    ));
  };

  return (
    <div className={styles.mainContent}>
      <div className={styles.contentHotJobs}>
        <SwiperComponent />
      </div>
      <div className={styles.contentNavbar}>
        {" "}
        {location === jobs ? (
          <Navbar />
        ) : (
          <p className={styles.companiesNavbarSuccessor}>
            1 - 50 company results from 4360 total companies on staff.am
          </p>
        )}{" "}
        <div className={styles.selectLimit}>
          {" "}
          <Selectlimit limit={limit} handleChange={handleChange} />
        </div>
      </div>

      <div className={styles.jobsColections}>
        {isLoading || loading ? <LinearColor /> : getData()}
      </div>
    </div>
  );
};

export default MainContent;
