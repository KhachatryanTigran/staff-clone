import React, { useState } from "react";

import { Controller, useForm, useFormState } from "react-hook-form";
import BasicButtons from "../../../UI/Button";
import TextField from "@mui/material/TextField";
import { v4 as uuid } from "uuid";
import styles from "./formCv.module.scss";
import EditorComponent from "../editor/Editor";
const FormCV = ({ onClick, update, handleClose }) => {
  const [editor, setEditor] = useState();
  const { handleSubmit, reset, control } = useForm({ mode: "onBlur" });
  const onSubmit = (data) => {
    update.cvInfo?.formData
      ? onClick([...update.cvInfo.formData, { data, editor, key: uuid() }])
      : onClick([{ data, editor, key: uuid() }]);
    reset();
  };
  const { errors } = useFormState({ control });
  return (
    <div className={styles.mainBox}>
      {update?.cvInfo?.formData.map((elem, i) => {
        return (
          <div key={elem.key} className={styles.lable}>
            {" "}
            <span>{Object.values(elem.data).join(" / ")}</span>{" "}
          </div>
        );
      })}
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        {update?.data?.levels.map((level) => {
          return (
            <div key={uuid()} className={styles.inputBox}>
              <lable>{level}</lable>
              <Controller
                control={control}
                rules={{ required: `${level + " cannot be blank."} ` }}
                name={level}
                render={({ field: { onChange, onBlur, value, ref } }) => (
                  <TextField
                    error={errors[level] ? true : false}
                    color="customGreen"
                    size="small"
                    defaultValue={update?.cvInfo?.formData[level]}
                    fullWidth={true}
                    onChange={onChange}
                    onBlur={onBlur}
                    value={value}
                    helperText={errors[level]?.message}
                  />
                )}
              />
            </div>
          );
        })}
        <div className={styles.inputDate}>
          <Controller
            control={control}
            name="from"
            rules={{ required: "! important" }}
            render={({ field: { onChange, onBlur, value, ref } }) => (
              <TextField
                defaultValue={update?.cvInfo?.formData["from"]}
                error={errors["from"] ? true : false}
                color="customGreen"
                size="small"
                label="From"
                type="date"
                sx={{ width: 220 }}
                InputLabelProps={{
                  shrink: true,
                }}
                fullWidth={true}
                onChange={onChange}
                onBlur={onBlur}
                value={value}
                helperText={errors["from"]?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="to"
            rules={{ required: "! important" }}
            render={({ field: { onChange, onBlur, value, ref } }) => (
              <TextField
                defaultValue={update?.cvInfo?.formData["to"]}
                error={errors["to"] ? true : false}
                color="customGreen"
                size="small"
                label="To"
                type="date"
                sx={{ width: 220 }}
                InputLabelProps={{
                  shrink: true,
                }}
                fullWidth={true}
                onChange={onChange}
                onBlur={onBlur}
                value={value}
                helperText={errors["to"]?.message}
              />
            )}
          />
        </div>
        <div className={styles.editor}>
          <EditorComponent update={update} onEdit={setEditor} />
        </div>
        <div className={styles.formBtn}>
          <BasicButtons type="submit">Save</BasicButtons>
          <BasicButtons onClick={handleClose}>Cancel</BasicButtons>
        </div>
      </form>
    </div>
  );
};

export default FormCV;
