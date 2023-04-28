import React from "react";
import styles from "./contents.module.scss";
import BasicButtons from "../../UI/Button";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { PATHNAME } from "../../constants/pathname";
import { Link } from "react-router-dom";

import BassicVerifiedIcon from "../../UI/VerifiedIcon";
import HeartIcon from "../../UI/HeartIcon";

const JobItem = ({ id, item, toCompany }) => {
  const { jobs, jobInfoToCompany } = PATHNAME;
  const iconWidth = { width: "15px" };

  return (
    <Link
      to={!toCompany ? `${jobs}/${id}` : `${jobInfoToCompany}/${id}?current`}
    >
      <div className={styles.jobInfo}>
        <img src={item?.photoUrl} alt="img" />
        <div className={styles.jobInfoTitleBlocks}>
          <h4> {item?.jobName}</h4>

          <div className={styles.jobInfoTitle}>
            <BassicVerifiedIcon customStyles={iconWidth} />
            <span>{item?.companyName}</span>
          </div>
        </div>
        <div className={styles.jobInfoTitleBlocks}>
          <div className={styles.jobInfoTitle}>
            <CalendarMonthIcon color="customGreen" sx={{ ...iconWidth }} />
            {/* <span>{item?.date}</span> */}
          </div>
          <div className={styles.jobInfoTitle}>
            <LocationOnIcon color="customGreen" sx={{ ...iconWidth }} />

            <span>{item?.location}</span>
          </div>
        </div>

        <div className={styles.jobInfoButton}>
          <BasicButtons size="small" variant="Follow">
            <HeartIcon />
            Follow
          </BasicButtons>
          <BasicButtons size="small" variant="ViewMore">
            View more
          </BasicButtons>
        </div>
      </div>
    </Link>
  );
};

export default JobItem;
