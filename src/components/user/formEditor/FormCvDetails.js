import React from "react";
import ImageAvatars from "../../../UI/Avatar";
import defaultimage from "../../../images/default.svg";
import parse from "html-react-parser";
import draftToHtml from "draftjs-to-html";
import styles from "./formCv.module.scss";
const FormCvDetails = ({ item, title }) => {
  return (
    <div className={styles.mainDetails}>
      <ImageAvatars photoURL={defaultimage} variant="Avatar" />
      <div className={styles.detailItem}>
        <span className={styles.detailText}>
          {Object.values(item.data).join(" / ")}
        </span>
        {parse(`${draftToHtml(item.editor)}`)[0].props.children && (
          <>
            <h4> {title + "  Details:"}</h4>
            <div className={styles.editorText}>
              {parse(`${draftToHtml(item.editor)}`)}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default FormCvDetails;
