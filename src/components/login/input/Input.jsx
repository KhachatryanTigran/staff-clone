import React, { useRef, useState } from "react";
import style from "../input/input.module.scss";
import PersonIcon from "@mui/icons-material/Person";

const InputField = ({
  name,
  type,
  placeholder,
  register,
  errors,
  border,
  imageContent,
  img,
  defaultValue,
}) => {
  const hasType = type === "file" ? { display: "none" } : null;

  if (type === "file") {
  }

  const fileInputRef = useRef(null);
  return (
    <div className={style.inputBlock}>
      <input
        style={hasType}
        defaultValue={defaultValue}
        type={type}
        id={type}
        ref={fileInputRef}
        placeholder={placeholder}
        className={
          border ? `${style.input} ${style.noneBorder}` : `${style.input}`
        }
        {...register(name, {
          required: `Invalid ${name}`,
        })}
      />
      {type === "file" ? (
        <label className={style.label} htmlFor="file">
          {imageContent?.[0]?.name ? (
            <div className={style.img__block}>
              <img src={img} alt="img" />
              <span>{imageContent[0].name}</span>
            </div>
          ) : (
            <>
              <PersonIcon
                color="customGreen"
                sx={{ width: "50px", height: "50px", marginRight: "10px" }}
              />
              <span>Add a image</span>
            </>
          )}
        </label>
      ) : null}

      <span className={style.error__style}>
        {errors && errors[name] && errors[name].message && (
          <p>{errors[name].message}</p>
        )}
      </span>
    </div>
  );
};

export default InputField;
