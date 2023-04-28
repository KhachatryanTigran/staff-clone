import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import EditActionButtons from "../../../UI/EditIcon";
import draftToHtml from "draftjs-to-html";
import styles from "./accordion.module.scss";
import parse from "html-react-parser";
import Details from "./Details";
import { v4 as uuid } from "uuid";
export default function CvItem({
  title,
  lable,
  cvData,
  children,
  onClick,
  data,
}) {
  const handleClick = () => {
    onClick({ title, lable, cvInfo: cvData[title], data });
  };

  return (
    <div>
      <Accordion expanded={true}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography sx={{ fontWeight: "600" }}>{title}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <div className={styles.changeButtons}>
            {children}
            <div className={styles.editorText}>
              <Typography sx={{ maxWidth: "100%" }} component={"span"}>
                {cvData[title]?.editorData || cvData[title]?.formData.length ? (
                  <div className={styles.editorText}>
                    {parse(`${draftToHtml(cvData[title]?.editorData)}`)}
                    {cvData[title]?.formData?.map((item, i) => {
                      return (
                        <Details
                          item={item}
                          title={title}
                          index={i}
                          key={uuid()}
                        />
                      );
                    })}{" "}
                  </div>
                ) : (
                  lable
                )}
              </Typography>
            </div>
            <div className={styles.changeIcons}>
              <EditActionButtons onClick={handleClick} />
            </div>
          </div>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
