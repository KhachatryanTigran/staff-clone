import React from "react";
import BasicButtons from "../../../UI/Button";
import HeartIcon from "../../../UI/HeartIcon";
import BassicVerifiedIcon from "../../../UI/VerifiedIcon";
import styles from "./companyItem.module.scss";
import ClockIcon from "../../../UI/ClockIcon";
import { Link } from "react-router-dom";
const CompanyItem = ({ item, id }) => {
  return (
    <Link to={`/companyDetails/${id}`}>
      <div className={styles.jobInfo}>
        <img src={item?.photoURL} alt="img" />
        <div className={styles.jobInfoTitleBlocks}>
          <div className={styles.block}>
            <h4> {item?.companyName}</h4>
            <BassicVerifiedIcon customStyles={"iconWidth"} />
          </div>
          <div className={styles.jobInfoTitle}>
            <span>{"Folowers"}</span>
          </div>
        </div>
        <div className={styles.jobInfoTitleBlocks}>
          <div className={styles.jobInfoTitle}></div>
          <div className={styles.jobInfoTitle}>
            <ClockIcon color="customGreen" fontSize="small" />{" "}
            <span>{"active Jobs"}</span>
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

export default CompanyItem;
