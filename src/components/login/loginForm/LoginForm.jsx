import React from "react";
import style from "../loginForm/loginForm.module.scss";
import { useForm } from "react-hook-form";

import InputField from "../input/Input";

import { auth, db } from "../../../firebase";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import {
  changeCurrentUser,
  changeIsUser,
  closeLoginModal,
} from "../../../store/slices/loginSlice";

import SignInButton from "../../../UI/Button";
import { doc, getDoc } from "firebase/firestore";

const LoginForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isOpenModal = useSelector((state) => state.loginSlice.showLogin);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    mode: "onBlur",
  });

  const onSubmit = async (data) => {
    try {
      const currUser = await signInWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );

      try {
        const docRef = doc(db, "users", currUser.user.uid);
        const d = await getDoc(docRef);
        dispatch(changeIsUser(d?.data().isUser));
      } catch (error) {
        if (isOpenModal) {
          dispatch(changeCurrentUser(null));
          dispatch(changeIsUser(null));
          signOut(auth);
          navigate("/company/login");
          dispatch(closeLoginModal());
          return;
        }
        console.log(error);
      }
      navigate("/");
      dispatch(closeLoginModal());
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
            errors={errors}
          />
        </div>

        <div className={style.inputBlock}>
          <InputField
            heigth="large"
            name="password"
            type="password"
            placeholder="Your Password"
            register={register}
            errors={errors}
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
          <span className={style.forgotPAss}> Register</span> your account now.
        </div>
      </form>
    </div>
  );
};
export default LoginForm;
