import React from "react";
import { NavLink } from "react-router-dom";
import style from "./hoverMenu.module.scss";
const HoverMenu = ({
  onClickMenuItemOne,
  lableMenuItemOne,
  lableMenuItemTwo,
  onClickMenuItemTwo,
  isModal,
  isHomePage,
  lable,
}) => {
  return (
    <div className={style.dropdown}>
      <div
        className={
          isHomePage ? style.dropdown__text__home : style.dropdown__text
        }
      >
        {lable}
      </div>
      <div className={style.dropdown__content}>
        <div className={style.arrow_up}></div>
        <div className={style.block__down}>
          <div className={style.dropdown__button}>
            {isModal ? (
              <div
                onClick={onClickMenuItemOne}
                className={style.dropdown__button}
              >
                <button className={style.btn}>{lableMenuItemOne}</button>
              </div>
            ) : (
              <NavLink to="/company/login">
                <button className={style.btn}> {lableMenuItemOne}</button>
              </NavLink>
            )}
          </div>

          <div className={style.dropdown__button}>
            {isModal ? (
              <div
                onClick={onClickMenuItemTwo}
                className={style.dropdown__button}
              >
                <button className={style.btn}>{lableMenuItemTwo}</button>
              </div>
            ) : (
              <NavLink to="/company/register">
                <button className={style.btn}> {lableMenuItemTwo}</button>
              </NavLink>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HoverMenu;
