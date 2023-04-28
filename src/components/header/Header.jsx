import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { NavLink, useLocation, useNavigate } from "react-router-dom";
import style from "../header/header.module.scss";
import logo from "../../images/logo.png";
import homeLogo from "../../images/homeLogo.png";

import {
  openComponyLogin,
  openLogin,
  openRegister,
} from "../../store/slices/loginSlice";

import Logo from "../logo/Logo";
import clsx from "clsx";

import HoverMenu from "../hoverMenu/HoverMenu";

const Header = () => {
  const isUser = useSelector((state) => state.loginSlice.isUser);

  const dispatch = useDispatch();
  const pathname = useLocation().pathname;
  const isHomePage = pathname === "/";
  const onClickLoginUser = () => dispatch(openLogin());
  const onClickLoginRegiter = () => {
    dispatch(openRegister());
  };
  const openLoginCompany = () => dispatch(openComponyLogin());
  const currentUser = useSelector((state) => state.loginSlice.currentUser);

  return (
    <header
      className={`${style.header} ${[isHomePage ? "" : style.whiteHeader]}`}
    >
      <div className={style.mainNavbar}>
        <div className="container">
          <div className={style.header__block}>
            <NavLink to="/">
              <div className={style.logo}>
                <img src={isHomePage ? homeLogo : logo} alt="logo" />
              </div>
            </NavLink>
            <div className={style.mainMenu}>
              <ul className={style.menu}>
                <NavLink
                  to="/jobs"
                  className={clsx({
                    activeLink: pathname === "/jobs",
                    notActive: pathname !== "/jobs" && !isHomePage,
                  })}
                >
                  {" "}
                  <li>Jobs</li>
                </NavLink>
                <NavLink
                  to="/companies"
                  className={clsx({
                    activeLink: pathname === "/companies",
                    notActive: pathname !== "/companies" && !isHomePage,
                  })}
                >
                  {" "}
                  <li> Companies</li>{" "}
                </NavLink>
                {currentUser ? (
                  <>
                    {isUser ? (
                      <NavLink
                        to={`/user/${currentUser.uid}`}
                        className={style.logOutoBox}
                      >
                        <li>
                          <Logo
                            currentCompany={currentUser}
                            isHomePage={isHomePage}
                          />
                        </li>
                      </NavLink>
                    ) : (
                      <NavLink
                        to={`/company/${currentUser.uid}`}
                        className={style.logOutoBox}
                      >
                        <li>
                          <Logo
                            currentCompany={currentUser}
                            isHomePage={isHomePage}
                          />
                        </li>{" "}
                      </NavLink>
                    )}
                  </>
                ) : (
                  <>
                    <li className={style.item}>
                      <HoverMenu
                        lable=" For Companies"
                        onClickMenuItemOne={openLoginCompany}
                        lableMenuItemOne="Sign In"
                        lableMenuItemTwo="Register"
                        isHomePage={isHomePage}
                      ></HoverMenu>
                    </li>
                    <li className={style.item}>
                      <HoverMenu
                        lable=" For Job-seekers"
                        onClickMenuItemOne={onClickLoginUser}
                        onClickMenuItemTwo={onClickLoginRegiter}
                        lableMenuItemOne="Sign In"
                        lableMenuItemTwo="Register"
                        isModal={true}
                        isHomePage={isHomePage}
                      ></HoverMenu>
                    </li>{" "}
                  </>
                )}
              </ul>
            </div>
          </div>
        </div>{" "}
      </div>
    </header>
  );
};

export default Header;
