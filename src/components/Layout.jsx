import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./header/Header";
import DialogLogin from "./login/loginModal/DialogLogin";
export const Layout = () => {
  return (
    <>
      <Header />
      <DialogLogin />
      <Outlet />
    </>
  );
};
