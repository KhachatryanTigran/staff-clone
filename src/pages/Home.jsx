import React from "react";
import Button from "@mui/material/Button";
import SearchIcon from "@mui/icons-material/Search";
import { margin } from "@mui/system";
import Slider from "../components/carusel/Carousel";
import styles from "./Home.module.scss";
import { useSelector } from "react-redux";

import { v4 as uuid } from "uuid";
import { JOB__CATEGORY, CITIES } from "../constants/category";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import { WrapperJob } from "../components/wrapper/HomeWrapperJob";
import { useState } from "react";
import { WrapperCompany } from "../components/wrapper/HomeWrapperCompany";
import { SwiperComponent } from "../components/swiper/Swiper";

const Home = () => {
  const [toggle, setToggle] = useState(true);

  const clickCompany = () => {
    setToggle(false);
  };
  const clickJob = () => {
    setToggle(true);
  };

  return (
    <div className={styles.main}>
      <div className={styles.search_section}>
        <div className={styles.text}>
          <h1 className={styles.text_h1}>CAREER SEARCH STARTS HERE</h1>
          <p className={styles.text_p}>
            Search for jobs, find your match and apply with one click.
          </p>
          <p className={styles.text_p}>Explore all our options now.</p>
        </div>
        <form>
          <div className={styles.search_clearfix}>
            <div className={styles.jobfilter}>
              <label className={styles.label}>
                <div className={styles.iratio}>
                  <input
                    type="radio"
                    name="job"
                    onClick={clickJob}
                    defaultChecked="ckeched"
                  />
                </div>
                JOBS
              </label>

              <label className={styles.label}>
                <div className={styles.iratio}>
                  <input type="radio" name="job" onClick={clickCompany} />
                </div>
                COMPANIES
              </label>
              <div className={styles.wrapper}>
                {toggle && <WrapperJob />}

                {!toggle && <WrapperCompany />}
              </div>
            </div>
          </div>
        </form>
        <div>
          <Slider />
        </div>
      </div>
      <div>
        <h2 className={styles.hotjobs}>HOT JOBS</h2>
      </div>
      <div>
        <SwiperComponent />
      </div>
    </div>
  );
};

export default Home;
