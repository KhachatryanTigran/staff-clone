import React from "react";
import JobDetailsContent from "./JobDetailsContent";
import styles from "./Jobdetails.module.scss";
import BasicButtons from "../../UI/Button";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { COLORS } from "../../constants/styles";
import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router";
import { useCallback } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";
import ImageAvatars from "../../UI/Avatar";

const JobDetails = () => {
  const [jobData, setJobData] = useState({});

  const { id } = useParams();

  const getData = useCallback(async () => {
    const docRef = doc(db, "jobs", id);
    const docSnap = await getDoc(docRef);
    setJobData(docSnap.data());
  }, [id]);

  useEffect(() => {
    window.scrollTo(0, 0);
    getData();
  }, [getData]);

  const customButtonStylesRed = {
    textTransform: "none",
    "&:hover": {
      color: "white",
      backgroundColor: COLORS.customRed,
    },
  };
  const heartIconStyles = {
    width: "18px",
    marginRight: "5px",
  };
  const customButtonStylesGreen = {
    textTransform: "none",
    "&:hover": {
      color: "white",
      backgroundColor: COLORS.customGreen,
    },
  };

  const avatarCustomStyles = { width: 140, height: 140 };

  return (
    <div className="jobs">
      <div className="container">
        <div className={styles.search}>
          <div className={styles.header_info}>
            <img src="/img/jobtitle.png" alt={""} />
            <div className={styles.contailner_relative}>
              <div className={styles.image}>
                <ImageAvatars
                  photoURL={jobData?.img}
                  customStyles={avatarCustomStyles}
                />
              </div>
            </div>

            <div className={styles.company}>
              <div className={styles.company_info}>
                <div className={styles.company_title}>
                  <h1>{jobData?.companyName}</h1>
                </div>

                <div className={styles.jobInfoButton}>
                  <BasicButtons
                    size="small"
                    color="customRed"
                    variant="outlined"
                    customStyles={customButtonStylesRed}
                  >
                    <FavoriteBorderIcon
                      sx={{ ...heartIconStyles }}
                    ></FavoriteBorderIcon>
                    Follow
                  </BasicButtons>
                  <BasicButtons
                    size="small"
                    variant="outlined"
                    sx={{ ...customButtonStylesGreen }}
                  >
                    Save this Job
                  </BasicButtons>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="sidebar"></div>
        <JobDetailsContent jobData={jobData} />
      </div>
    </div>
  );
};

export default JobDetails;
