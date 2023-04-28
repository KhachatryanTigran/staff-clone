import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  closeLoginModal,
  openLogin,
  openRegister,
} from "../../../store/slices/loginSlice";
import BasicButtons from "../../../UI/Button";
import AlertDialogSlide from "../../../UI/Dialog";
import LoginForm from "../loginForm/LoginForm";
import RegisterForm from "../registerForm/RegisterForm";

const DialogLogin = () => {
  const showLogin = useSelector((state) => state.loginSlice.showLogin);
  const showRegister = useSelector((state) => state.loginSlice.showRegister);
  const showLoginCompany = useSelector(
    (state) => state.loginSlice.showComponyLogin
  );
  const dispatch = useDispatch();
  const handleClose = () => dispatch(closeLoginModal());
  const onClickBtnRegister = () => dispatch(openRegister());
  const onClickBtnLogin = () => dispatch(openLogin());

  return (
    <>
      {showRegister || showLoginCompany || showLogin}
      <AlertDialogSlide
        open={showLoginCompany || showRegister || showLogin}
        handleClose={handleClose}
        title={showRegister ? "Register" : "Login"}
      >
        <>
          <div>
            <BasicButtons
              onClick={onClickBtnRegister}
              variant={showLogin ? "outlined" : "contained"}
              customStyles={{ borderRadius: "0" }}
            >
              Register your account
            </BasicButtons>
            <BasicButtons
              customStyles={{ borderRadius: "0" }}
              onClick={onClickBtnLogin}
              variant={showRegister ? "outlined" : "contained"}
            >
              Sign in to your account
            </BasicButtons>
          </div>
          {showRegister ? <RegisterForm /> : <LoginForm />}
        </>
      </AlertDialogSlide>
    </>
  );
};

export default DialogLogin;
