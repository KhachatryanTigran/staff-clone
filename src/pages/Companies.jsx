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
  const industry = useSelector(
    (state) => state.filterSlice.industryCategoryCompany
  );

  useEffect(() => {
    if (industry) {
      let path = industry.map((i) => i);
      setSearchParams({ filter: path });
    }
  }, [industry]);

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
