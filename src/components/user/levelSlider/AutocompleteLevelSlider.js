import React, { useCallback, useEffect, useRef, useState } from "react";
import ComboBox from "./AutocompleteTextField";
import DiscreteSliderValues from "./Slider";
import styles from "./autocompleteLevelSlider.module.scss";
import BasicButtons from "../../../UI/Button";
import EditIcon from "@mui/icons-material/Edit";
import { v4 as uuid } from "uuid";
import AddIcon from "@mui/icons-material/Add";
const AutocompleteLevelSlider = ({ update, handleClose, handleClick }) => {
  const [count, setCount] = useState([{ disabled: false, key: uuid() }]);
  const [value, setValue] = useState();
  const [merged, setMerged] = useState([]);
  const [level, setLevel] = useState();
  const ref = useRef();
  useEffect(() => {
    if (update.cvInfo?.formData) {
      setCount([
        ...update.cvInfo.formData.map((elem, i, arr) => {
          return { ...elem, disabled: true };
        }),
        { disabled: false, key: uuid() },
      ]);

      setMerged(update.cvInfo.formData);
    }
  }, [update]);

  const onClick = () => {
    let newMerged = [...merged];
    const newItems =
      value !== undefined && level !== undefined
        ? [{ value, level, key: uuid() }]
        : [];

    if (ref.current >= 0) {
      newMerged.splice(ref.current, 1, ...newItems);
    } else {
      newMerged = newMerged.concat(newItems);
    }

    handleClick(newMerged);
    setMerged([]);
    setValue();
    setLevel();
    ref.current = undefined;
  };
  const onAddNew = () => {
    if (value !== undefined && level !== undefined) {
      setMerged([...merged, { value, level, key: uuid() }]);
    }
    setCount([
      ...count.map((elem, i) => {
        if (!elem.disabled) {
          return { ...elem, disabled: true, value, level };
        }
        return { ...elem, disabled: true };
      }),
      { disabled: false, key: uuid() },
    ]);
    setValue();
    setLevel();
    ref.current = undefined;
  };
  const onEdit = useCallback(
    (item, index) => {
      if (value !== undefined && level !== undefined) {
        if (ref.current >= 0) {
          const updatedItem = { value, level, key: uuid() };
          setMerged((prevMerged) => {
            const newMerged = [...prevMerged];
            newMerged.splice(ref.current, 1, updatedItem);
            return newMerged;
          });
        } else {
          setMerged((prevMerged) => [
            { value, level, key: uuid() },
            ...prevMerged,
          ]);
        }
      }
      setCount((prevCount) =>
        prevCount.map((elem, i) => {
          if (i === index) {
            return { ...elem, disabled: false };
          } else if (!elem.disabled) {
            return { ...elem, value, level, disabled: true };
          }
          return { ...elem, disabled: true };
        })
      );
      setValue(item.value);
      setLevel(item.level);
      ref.current = index;
    },
    [value, level, setMerged, setCount, setValue, setLevel, ref]
  );

  return (
    <div>
      <div>
        <span>{update.data.title}</span>
      </div>
      {count.map((item, i) => {
        return (
          <div className={styles.optionBlock} key={item.key}>
            <div className={styles.selectBlock}>
              <ComboBox
                defaultValue={item.value && item.value}
                selectedValue={update?.cvInfo?.formData}
                disabled={item.disabled}
                optionsData={update.data.options}
                setValue={setValue}
              />
            </div>
            <div>
              <DiscreteSliderValues
                disabled={item.disabled}
                level={item?.level && item.level}
                levels={update.data.levels}
                setLevel={setLevel}
              />
            </div>
            <div>
              <EditIcon variant="remove" onClick={() => onEdit(item, i)} />
            </div>{" "}
          </div>
        );
      })}
      <div className={styles.buttonBlock}>
        <BasicButtons onClick={onAddNew}>
          <AddIcon />
          AddNew
        </BasicButtons>
        <BasicButtons onClick={onClick}>Save</BasicButtons>
        <BasicButtons onClick={handleClose}>Cancel</BasicButtons>
      </div>
    </div>
  );
};

export default AutocompleteLevelSlider;
