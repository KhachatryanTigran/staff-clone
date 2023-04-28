import React from "react";
import MainContent from "../components/content/MainContent";
import MainSidebar from "../components/sidebars/MainSidebar";
import "../styles.scss";
import "../App.scss";
import { useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";
const Jobs = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const jobCategory = useSelector((state) => state.filterSlice.jobCategory);

  useEffect(() => {
    if (jobCategory) {
      let path = jobCategory.map((i) => i);
      setSearchParams({ filter: path });
    }
  }, [jobCategory, setSearchParams]);

  return (
    <div className="outContiner">
      <div className="container">
        <div className="jobs">
          <div className="sidebar">
            <MainSidebar />
          </div>
          <div className="content">
            <MainContent />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Jobs;
