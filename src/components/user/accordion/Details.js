import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { TYPES } from "../../../constants/userdata";
import { useUpdateCvMutation } from "../../../store/slices/dataControlRTKQ";
import { changeCv } from "../../../store/slices/userSlice";
import RemoveIcon from "../../../UI/RemoveIcon";
import FormCvDetails from "../formEditor/FormCvDetails";
import LevelSliderDetails from "../levelSlider/LevelSliderDetails";
import LimitTagsDetails from "../limitTags/LimitTagsDetails";
import styles from "./details.module.scss";
const Details = ({ title, item, index }) => {
  const currentUser = useSelector((state) => state.loginSlice.currentUser);
  const [updateCv, { isSuccess }] = useUpdateCvMutation();
  const cvData = useSelector((state) => state.userSlice.cvData);
  const dispatch = useDispatch();
  const setCvData = (id, cvData, title) => {
    updateCv({ id, cvData, title }).unwrap();
  };
  const onRemove = (e) => {
    let formData = cvData[title].formData.reduce((total, item, i) => {
      if (i !== index) {
        total.push(item);
      }
      return total;
    }, []);

    dispatch(
      changeCv({
        ...cvData,

        [title]: { ...cvData[title], formData },
      })
    );

    setCvData(currentUser.uid, {
      ...cvData,

      [title]: { ...cvData[title], formData },
    });
  };

  return (
    <div className={styles.mainBox}>
      {TYPES.formEditor.includes(title) ? (
        <>
          {" "}
          <FormCvDetails item={item} title={title} />
          <RemoveIcon onClick={onRemove} variant="remove" />
        </>
      ) : TYPES.levelSlider.includes(title) ? (
        <>
          <LevelSliderDetails item={item} />{" "}
          <RemoveIcon onClick={onRemove} variant="remove" />
        </>
      ) : TYPES.autocomplete.includes(title) ? (
        <>
          {" "}
          <LimitTagsDetails item={item} />{" "}
        </>
      ) : null}
    </div>
  );
};

export default Details;
