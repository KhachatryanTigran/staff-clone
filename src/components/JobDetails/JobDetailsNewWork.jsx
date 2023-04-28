import React, { useEffect, useCallback } from "react";

import styles from "./Jobdetails.module.scss";

import BookmarkIcon from "@mui/icons-material/Bookmark";

import { useLocation, useNavigate, useParams } from "react-router";

import { v4 as uuid } from "uuid";

import parse from "html-react-parser";

import { useDispatch, useSelector } from "react-redux";

import { doc, setDoc, getDoc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "../../firebase";
import BasicButtons from "../../UI/Button";
import { useState } from "react";
import {
  activeDataSelector,
  changeJobSlice,
} from "../../store/slices/newJobSlice";
import draftToHtml from "draftjs-to-html";
import { currentSelector } from "../../store/slices/loginSlice";
import { PATHNAME } from "../../constants/pathname";
const JobDetailsNewWork = () => {
  const { jobInfo, jobInfoToCompany, addNewWork, current } = PATHNAME;
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const params = useParams();
  const id = params.id;
  const pathName = location.pathname;

  const [jobData, setJobData] = useState([]);
  const [loading, setLoading] = useState(false);

  const currentUser = useSelector(currentSelector);
  const activeData = useSelector(activeDataSelector);

  const getData = useCallback(async () => {
    if (pathName === `${jobInfo}` || pathName === `${jobInfoToCompany}/${id}`) {
      setJobData(activeData);
      setLoading(true);
    }
    if (
      pathName === `${jobInfoToCompany}/${id}` &&
      location.search === "?current"
    ) {
      const docRef = doc(db, "jobs", id);
      const docSnap = await getDoc(docRef);
      setJobData(docSnap.data());
      setLoading(true);
    }
  }, [activeData, id, location.search, pathName]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    getData();
  }, [getData]);

  const onClickDelete = async () => {
    await deleteDoc(doc(db, "jobs", id));
    navigate("/companyPage");
  };

  const onAddJob = async () => {
    try {
      const document = doc(db, "jobs", id);
      await updateDoc(document, {
        ...jobData,
      });
    } catch (error) {
      try {
        await setDoc(doc(db, "jobs", uuid()), {
          ...jobData,
          companyName: currentUser.displayName,
          id: uuid(),
          img: currentUser.photoURL,
          companyId: currentUser.uid,
        });

        dispatch(
          changeJobSlice({
            description: null,
            responsibilities: null,
            qualifications: null,
            additionalInformation: null,
            category: null,
            date: null,
            industry: null,
            jobName: null,
            level: null,
            location: null,
            JobType: null,
          })
        );
      } catch (error) {
        console.log("pls again");
      }
    }

    navigate(`/company/${currentUser.uid}`);
  };

  const onClickEdit = () => {
    dispatch(
      changeJobSlice({
        description: jobData.description,
        responsibilities: jobData.responsibilities,
        qualifications: jobData.qualifications,
        additionalInformation: jobData.additionalInformation,
        category: jobData.category,
        date: jobData.date,
        industry: jobData.industry,
        jobName: jobData.jobName,
        level: jobData.level,
        location: jobData.location,
        JobType: jobData.JobType,
      })
    );
    id ? navigate(`${addNewWork}/${id}`) : navigate(addNewWork);
  };

  return (
    <>
      {loading && (
        <div className={styles.mainContent}>
          <div className={styles.jobsColections}>
            <div className={styles.row}>
              <div className={styles.name_coloumn}>
                <h2>{jobData.jobName}</h2>
              </div>
            </div>
            <div className={styles.bord}>
              <div className={styles.coloumn}>
                <div className={styles.columns__block}>
                  <BookmarkIcon
                    color="success"
                    sx={{
                      fontSize: 20,
                    }}
                  />
                  <span className={styles.text}>
                    Employment term:<span>permanent</span>
                  </span>
                </div>

                <div className={styles.columns__block}>
                  <BookmarkIcon
                    color="success"
                    sx={{
                      fontSize: 20,
                    }}
                  />
                  <span className={styles.text}>
                    Category: <span>{jobData.category}</span>
                  </span>
                </div>
              </div>

              <div className={styles.coloumn}>
                <div className={styles.columns__block}>
                  <BookmarkIcon
                    color="success"
                    sx={{
                      fontSize: 20,
                    }}
                  />
                  <span className={styles.text}>
                    Job type:<span>Full Time</span>
                  </span>
                </div>

                <div className={styles.columns__block}>
                  <BookmarkIcon
                    color="success"
                    sx={{
                      fontSize: 20,
                    }}
                  />
                  <span className={styles.text}>
                    Location: <span>{jobData.location}</span>
                  </span>
                </div>
              </div>
            </div>

            <div className={styles.joblist}>
              <h3>Job description</h3>
              <div className={styles.desk}>
                {parse(`${draftToHtml(jobData.description)}`)}
              </div>

              <h3>Job responsibility</h3>
              {parse(`${draftToHtml(jobData.responsibilities)}`)}

              <h3>Required qualifications</h3>

              <div>{parse(`${draftToHtml(jobData.qualifications)}`)}</div>

              <h3>
                Required candidate level:
                <span className={styles.levelSpan}>{jobData.level}</span>
              </h3>

              <h3>Additional information</h3>
              <div className={styles.test}>
                {parse(`${draftToHtml(jobData.additionalInformation)}`)}
              </div>
              <p className={styles.oddinfo}>
                Please clearly mention that you have heard of this job
                opportunity on staff.am.{" "}
              </p>
            </div>

            <div className={styles.joblist_skills}>
              <div className={styles.inn}>
                <h3>Professional skills</h3>
              </div>

              <div className={styles.inn}>
                <h3>Soft Skills</h3>
              </div>
            </div>
          </div>
          <div className={styles.apply_btns_block}>
            <BasicButtons onClick={onClickDelete} className={styles.btn}>
              Delete
            </BasicButtons>
            <BasicButtons onClick={onClickEdit} className={styles.btn}>
              Edit
            </BasicButtons>

            {(pathName === `${jobInfo}` || location.search !== current) && (
              <BasicButtons onClick={onAddJob} className={styles.btn}>
                Add
              </BasicButtons>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default JobDetailsNewWork;
