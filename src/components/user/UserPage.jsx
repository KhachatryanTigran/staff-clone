import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuid } from "uuid";
import AlertDialogSlide from "../../UI/Dialog";
import styles from "./user.module.scss";
import EditorComponent from "./editor/Editor";
import BasicButtons from "../../UI/Button";
import { useEffect } from "react";
import UserNavbar from "./navbars/UserNavbar";
import { CV, TYPES } from "../../constants/userdata";
import CvItem from "./accordion/CvItem";
import { changeCv } from "../../store/slices/userSlice";
import LimitTags from "./limitTags/LimitTags";
import AutocompleteLevelSlider from "./levelSlider/AutocompleteLevelSlider";
import FormCV from "./formEditor/FormCV";
import {
  useGetCvQuery,
  useUpdateCvMutation,
} from "../../store/slices/dataControlRTKQ";
import LinearColor from "../../UI/Progress";

const UserPage = () => {
  const currentUser = useSelector((state) => state.loginSlice.currentUser);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [update, setUpdate] = useState();
  const [convertedData, setConvertedData] = useState();
  const [updateCv, { isSuccess }] = useUpdateCvMutation();
  const { data, isLoading } = useGetCvQuery({ id: currentUser?.uid });
  const cvData = useSelector((state) => state.userSlice.cvData);
  const [test, setTest] = useState(true);
  const setCvData = (id, cvData, title) => {
    updateCv({ id, cvData, title }).unwrap();
  };

  useEffect(() => {
    if (currentUser) {
      setTest(false);
    }

    if (data) {
      dispatch(changeCv(data));
    }
  }, [data, dispatch, currentUser]);

  const handleClose = () => {
    setOpen(false);
    setUpdate();
  };

  const handleClick = (data) => {
    dispatch(
      changeCv({
        ...cvData,
        [update.title]: {
          ...(data ? { formData: data } : { editorData: convertedData }),
        },
      })
    );
    setCvData(currentUser.uid, {
      ...cvData,
      [update.title]: {
        ...(data ? { formData: data } : { editorData: convertedData }),
      },
    });
    setConvertedData();
    setOpen(false);
  };

  return (
    <div className={styles.outContiner}>
      <div className="container">
        <div className={styles.user}>
          <div>
            <UserNavbar user={currentUser} />
          </div>

          <div className={styles.userInfo}>
            {test || isLoading ? (
              <LinearColor />
            ) : (
              CV.map((p) => {
                return (
                  <div className={styles.cvItem} key={uuid()}>
                    <CvItem
                      cvData={cvData}
                      data={p?.data}
                      title={p.title}
                      lable={p.lable}
                      onClick={(currentData) => {
                        setOpen(true);
                        setUpdate(currentData);
                      }}
                    />
                  </div>
                );
              })
            )}
          </div>

          <div className={styles.editorDialog}>
            <AlertDialogSlide open={open} handleClose={handleClose}>
              {TYPES.editor.includes(update?.title) ? (
                <>
                  <BasicButtons onClick={() => handleClick()}>
                    {" "}
                    ADD
                  </BasicButtons>
                  <EditorComponent onEdit={setConvertedData} update={update} />
                </>
              ) : TYPES.formEditor.includes(update?.title) ? (
                <FormCV
                  handleClose={handleClose}
                  cvData={cvData}
                  update={update}
                  onClick={handleClick}
                  onEdit={setConvertedData}
                />
              ) : TYPES.levelSlider.includes(update?.title) ? (
                <AutocompleteLevelSlider
                  handleClick={handleClick}
                  update={update}
                  handleClose={handleClose}
                />
              ) : TYPES.autocomplete.includes(update?.title) ? (
                <LimitTags
                  cvData={cvData}
                  update={update}
                  onClick={handleClick}
                  onEdit={setConvertedData}
                  handleClose={handleClose}
                />
              ) : null}
            </AlertDialogSlide>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserPage;
