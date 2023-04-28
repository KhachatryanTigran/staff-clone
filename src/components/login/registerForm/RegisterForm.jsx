import React from "react";
import style from "./register.module.scss";
import { useForm } from "react-hook-form";

import InputField from "../input/Input";
import RegisterButtons from "../../../UI/Button";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db } from "../../../firebase";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import {
  changeIsUser,
  closeLoginModal,
} from "../../../store/slices/loginSlice";

const RegisterForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    mode: "onBlur",
  });

  const onSubmit = async (data) => {
    try {
      const res = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );

      try {
        await updateProfile(res.user, {
          displayName: data.firstName + " " + data.lastName,
        });

        await setDoc(doc(db, "users", res.user.uid), {
          uid: res.user.uid,
          email: data.email,
          isUser: true,
        });
        dispatch(changeIsUser(true));
      } catch (err) {
        console.log(err);
      }

      navigate("/");
      dispatch(closeLoginModal());
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className={style.registerForm}>
      <form onSubmit={handleSubmit(onSubmit)} className={style.form}>
        <div className={style.block}>
          <div className={style.inputBlock}>
            <p className={style.parag}>First name</p>
            <InputField
              heigth="large"
              name="firstName"
              type="text"
              placeholder=" Your first name"
              register={register}
              errors={errors}
            />
          </div>

          <div className={style.inputBlock}>
            <p className={style.parag}>Last name</p>
            <InputField
              heigth="large"
              name="lastName"
              type="text"
              placeholder=" Your last name"
              register={register}
              errors={errors}
            />
          </div>

          <div className={style.inputBlock}>
            <p className={style.parag}>Email</p>

            <InputField
              heigth="large"
              name="email"
              type="email"
              placeholder="Your email"
              register={register}
              errors={errors}
            />
          </div>

          <div className={style.inputBlock}>
            <p className={style.parag}>Password</p>

            <InputField
              heigth="large"
              name="password"
              type="password"
              placeholder="Your Password"
              register={register}
              errors={errors}
            />
          </div>

          <div className={style.inputBlock}>
            <p className={style.parag}>Repeat passsword</p>

            <InputField
              heigth="large"
              name="pas"
              type="password"
              placeholder="Repeat Password"
              register={register}
              errors={errors}
            />
          </div>

          <RegisterButtons type="submit" variant="solid">
            Register{" "}
          </RegisterButtons>
        </div>
      </form>
    </div>
  );
};
export default RegisterForm;
