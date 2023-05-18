import styles from "./Jobdetails.module.scss";
import BookmarkIcon from "@mui/icons-material/Bookmark";

import draftToHtml from "draftjs-to-html";
import parse from "html-react-parser";

const JobDetailsContent = ({ jobData }) => {
  console.log(jobData, "jobData");
  return (
    <>
      {jobData.jobName && (
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
                    Category: <span>{jobData.jobCategory}</span>
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
                {
                  // parse(`${draftToHtml(jobData.jobDescription)}`)
                  //we have problem whit test data and data from editor because of that test jobs dont work corect
                  //its easy to fix
                  //this solution only for fun

                  <span>{jobData.jobDescription}</span>
                }
              </div>

              <h3>Job responsibility</h3>
              {
                // parse(`${draftToHtml(jobData.responsibilities)}`)

                <span>{jobData.responsibilities}</span>
              }
              <h3>Required qualifications</h3>
              <div>
                {
                  // parse(`${draftToHtml(jobData.requiredqualifications)}`)

                  <span>{jobData.requiredqualifications}</span>
                }
              </div>

              <h3>
                Required candidate level:
                <span className={styles.levelSpan}>{jobData.level}</span>
              </h3>

              <h3>Additional information</h3>
              <div className={styles.test}>
                {
                  Array.isArray(jobData) &&
                    jobData?.additionalinformation.map((elem) => {
                      return <li>{elem}</li>;
                    })
                  //  parse(`${draftToHtml(jobData.additionalinformation)}`)
                }
              </div>
              <p className={styles.oddinfo}>
                Please clearly mention that you have heard of this job
                opportunity on staff.am.{" "}
              </p>
            </div>
            <div className={styles.joblist_skills}>
              <div className={styles.inn}>
                <h3>Professional skills</h3>
                <span className={styles.levelSpan}>
                  {jobData.professionalSkills.join("  ")}
                </span>
              </div>

              <div className={styles.inn}>
                <h3>Soft Skills</h3>
                <span className={styles.levelSpan}>
                  {jobData.softSkills.join("  ")}
                </span>
              </div>
            </div>
          </div>
          <div className={styles.single_job_bottom}></div>
        </div>
      )}
    </>
  );
};

export default JobDetailsContent;
