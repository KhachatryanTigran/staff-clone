import React from "react";
import { useRef } from "react";
import style from "../select/select.module.scss";
const Select = ({ register, name, errors, options, addstyles, value }) => {
  const ref = useRef();
  return (
    <div className={addstyles ? style.addBlock : style.select__block}>
      <select
        ref={ref}
        className={`${addstyles ? style.addSelect : style.select} `}
        {...register(name, {
          required: `Invalid ${name}`,
        })}
      >
        <option value=""></option>
        {options.map((o, i) =>
          o === value ? (
            <option key={i} value={o} selected>
              {o}
            </option>
          ) : (
            <option key={i} value={o}>
              {o}
            </option>
          )
        )}
      </select>

      <span className={style.error}>
        {errors && errors[name] ? <p>{errors[name].message}</p> : null}{" "}
      </span>
    </div>
  );
};

export default Select;
