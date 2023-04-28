import React from "react";
import { useSelector } from "react-redux";
import { v4 as uuid } from "uuid";
import styles from "./pdfConvertor.module.scss";
import BasicButtons from "../../../UI/Button";
import { TYPES } from "../../../constants/userdata";
import { PDFExport, savePDF } from "@progress/kendo-react-pdf";
import PDFNavbar from "./PDFNavbar";
import { NavLink } from "react-router-dom";
import FormCvDetails from "../formEditor/FormCvDetails";
import LevelSliderDetails from "../levelSlider/LevelSliderDetails";
import LimitTagsDetails from "../limitTags/LimitTagsDetails";
import draftToHtml from "draftjs-to-html";
import parse from "html-react-parser";
const PDFConvertor = () => {
  const pdfExportComponent = React.useRef(null);

  const currentUser = useSelector((state) => state.loginSlice.currentUser);
  const cvData = useSelector((state) => state.userSlice.cvData);

  const exportPDFWithComponent = () => {
    if (pdfExportComponent.current) {
      pdfExportComponent.current.save();
    }
  };

  return (
    <div className={styles.outContiner}>
      <div className={styles.continer}>
        <PDFExport ref={pdfExportComponent} paperSize="A4" margin={0}>
          <div className={styles.user}>
            <PDFNavbar user={currentUser} />

            <div className={styles.userInfo}>
              <div className={styles.sidebar}>
                {" "}
                {Object.keys(cvData).map((title) => {
                  return (
                    <div key={uuid()} className={styles.cvItem}>
                      {TYPES.levelSlider.includes(title) ? (
                        <>
                          <h3>{title}</h3>
                          <div className={styles.cvline}> </div>
                          {cvData[title].formData.map((item) => {
                            return (
                              <LevelSliderDetails item={item} key={item.key} />
                            );
                          })}
                        </>
                      ) : TYPES.autocomplete.includes(title) ? (
                        <>
                          <h3>{title}</h3>
                          <div className={styles.cvline}> </div>
                          {cvData[title].formData.map((item) => {
                            return (
                              <LimitTagsDetails item={item} key={uuid()} />
                            );
                          })}
                        </>
                      ) : null}
                    </div>
                  );
                })}
              </div>
              <div className={styles.content}>
                {" "}
                {Object.keys(cvData).map((title) => {
                  return (
                    <div key={uuid()} className={styles.cvItem}>
                      {TYPES.editor.includes(title) ? (
                        <>
                          <h3>{title}</h3>
                          <div className={styles.cvline}> </div>
                          <div className={styles.editorText}>
                            {parse(`${draftToHtml(cvData[title].editorData)}`)}
                          </div>
                        </>
                      ) : TYPES.formEditor.includes(title) ? (
                        <>
                          <h3>{title}</h3>
                          <div className={styles.cvline}> </div>
                          {cvData[title].formData.map((item) => {
                            return (
                              <FormCvDetails
                                item={item}
                                title={title}
                                key={item.key}
                              />
                            );
                          })}
                        </>
                      ) : null}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>{" "}
        </PDFExport>

        <div className={styles.btnBox}>
          {" "}
          <BasicButtons onClick={exportPDFWithComponent} variant="ViewMore">
            Download My CV
          </BasicButtons>
          <NavLink to={`/user/${currentUser?.displayName}`}>
            {" "}
            <BasicButtons variant="ViewMore">Edit CV</BasicButtons>
          </NavLink>{" "}
        </div>
      </div>
    </div>
  );
};

export default PDFConvertor;
