import React from "react";
import style from "../loginForm/loginForm.module.scss";
import { useForm } from "react-hook-form";

import InputField from "../input/Input";

import { auth, db } from "../../../firebase";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { useLocation, useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import {
  changeCurrentUser,
  changeIsLoading,
  changeIsUser,
  openLogin,
} from "../../../store/slices/loginSlice";

import SignInButton from "../../../UI/Button";
import { doc, getDoc } from "firebase/firestore";
import { Link } from "react-router-dom";

const CompanyLogin = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    mode: "all",
  });

  const onSubmit = async (data) => {
    try {
      dispatch(changeIsLoading(false));
      const currUser = await signInWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );

      try {
        const docRef = doc(db, "users", currUser.user.uid);
        const d = await getDoc(docRef);
        dispatch(changeIsUser(d?.data().isUser));
        if (location.pathname === "/company/login") {
          dispatch(changeCurrentUser(null));
          dispatch(changeIsUser(null));
          signOut(auth);
          navigate("/");
          dispatch(openLogin());
          return;
        }
      } catch (error) {
        console.log(error);
      }

      dispatch(changeIsLoading(true));
      navigate("/");
    } catch (error) {}
  };

  return (
    <div className={style.loginForm}>
      <form onSubmit={handleSubmit(onSubmit)} className={style.form}>
        <div className={style.inputBlock}>
          <InputField
            heigth="large"
            name="email"
            type="email"
            placeholder="Your Email"
            register={register}
            errors={errors?.message}
          />
        </div>

        <div className={style.inputBlock}>
          <InputField
            heigth="large"
            name="password"
            type="password"
            placeholder="Your Password"
            register={register}
            errors={errors?.message}
          />
        </div>

        <a href="" className={style.forgotPAss}>
          Forgot Password?
        </a>

        <SignInButton type="submit" variant="solid">
          Sign In
        </SignInButton>

        <div className={style.text}>
          Don't have an account yet?
          <Link to="/company/register">
            <span className={style.forgotPAss}> Register</span> your account
            now.
          </Link>
        </div>
      </form>
    </div>
  );
};
export default CompanyLogin;
