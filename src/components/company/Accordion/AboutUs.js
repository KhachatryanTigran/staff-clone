import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import EditActionButtons from "./EditIcon";
import draftToHtml from "draftjs-to-html";
import styles from "./accordion.module.scss";
import parse from "html-react-parser";
export default function CompanyInfo({ title, text, children, onClick }) {
  const handleClick = () => {
    onClick({ title, text });
  };
  return (
    <div>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={styles.typography}>...</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <div className={styles.changeButtons}>
            {children}
            <Typography className={styles.typography}>
              {parse(`${draftToHtml(text)}`)}
            </Typography>
            <div className={styles.changeIcons}>
              <EditActionButtons onClick={handleClick} />
            </div>
          </div>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
