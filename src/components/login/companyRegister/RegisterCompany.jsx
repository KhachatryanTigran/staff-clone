import React, { useEffect, useState } from "react";
import style from "../companyRegister/registerCompany.module.scss";
import { Controller, useForm } from "react-hook-form";
import SelectMy from "../../select/Select";

import {
  CITIES,
  INDUSTRIES_LEVELS,
  COUNTRIES,
} from "../../../constants/options";

import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { auth, db, storage } from "../../../firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc, Timestamp } from "firebase/firestore";
import { useNavigate } from "react-router";

import RegisterButton from "../../../UI/Button";
import InputField from "../input/Input";
import { InputLabel, MenuItem, Select, TextField } from "@mui/material";
import PhoneInputComp from "../inputPhone/InputPhone";

const RegisterCompany = () => {
  const navigate = useNavigate();

  const [image, setImage] = useState("");
  const [img, setImg] = useState(null);
  const {
    register,
    formState: { errors },
    handleSubmit,
    control,
    watch,
  } = useForm({
    mode: "onBlur",
  });

  const imgChange = watch("image");

  useEffect(() => {
    if (imgChange && imgChange[0]) {
      const picture = URL.createObjectURL(imgChange[0]);
      setImg(picture);
    }
    setImage(imgChange);
  }, [imgChange]);

  const onSubmit = async (data) => {
    console.log(data.country);
    console.log(data);
    try {
      const res = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );

      const storageRef = ref(storage, res.user.uid);

      await uploadBytesResumable(storageRef, data.image[0]).then(() => {
        getDownloadURL(storageRef).then(async (downloadURL) => {
          try {
            await updateProfile(res.user, {
              displayName: data.CompanyName,
              photoURL: downloadURL,
            });

            await setDoc(doc(db, "companies", res.user.uid), {
              uid: res.user.uid,
              companyName: data.CompanyName,
              address: data.address,
              city: data.city,
              country: data.country,
              email: data.email,
              industry: data.industry,
              phone: data.phoneInput,
              photoURL: downloadURL,
              date: Timestamp.now(),
              aboutUs: "",
            });
          } catch (err) {
            console.log(err);
          }
        });
      });

      setImage(data.image[0].name);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container">
      <div className={style.registerForm}>
        <form onSubmit={handleSubmit(onSubmit)} className={style.form}>
          <h1>Register Now</h1>
          <div className={style.block}>
            <div className={style.inputBlock}>
              <p className={style.parag}>Company name</p>
              <Controller
                name="CompanyName"
                control={control}
                rules={{ required: "wrong name" }}
                render={({ field }) => (
                  <TextField
                    size="small"
                    sx={{ width: "400px" }}
                    {...field}
                    label="Company Name"
                    variant="outlined"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    error={!!errors.CompanyName}
                    helperText={
                      errors.CompanyName ? "Company Name is required" : ""
                    }
                  />
                )}
              />
            </div>

            <div className={style.inputBlock}>
              <p className={style.parag}>Company Address </p>
              <Controller
                name="address"
                control={control}
                rules={{ required: "wrong adress" }}
                render={({ field }) => (
                  <TextField
                    size="small"
                    sx={{ width: "400px" }}
                    {...field}
                    label="Address"
                    variant="outlined"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    error={!!errors.address}
                    helperText={
                      errors.address ? "Company Name is required" : ""
                    }
                  />
                )}
              />
            </div>

            <div className={style.inputBlock}>
              <p className={style.parag}>Country</p>
              <Controller
                name="country"
                control={control}
                rules={{ required: "required" }}
                render={({ field }) => (
                  <Select
                    size="small"
                    sx={{ width: "400px" }}
                    {...field}
                    label="country"
                    variant="outlined"
                    error={!!errors.country}
                    helperText={errors.country ? "Select an option" : ""}
                  >
                    {COUNTRIES.map((c) => (
                      <MenuItem value={c}>{c}</MenuItem>
                    ))}
                  </Select>
                )}
              />
            </div>

            <div className={style.inputBlock}>
              <p className={style.parag}>City</p>
              <Controller
                name="city"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <Select
                    size="small"
                    sx={{ width: "400px" }}
                    {...field}
                    label="city"
                    variant="outlined"
                    error={!!errors.city}
                    helperText={errors.city ? "Select an option" : ""}
                  >
                    {CITIES.map((c) => (
                      <MenuItem value={c}>{c}</MenuItem>
                    ))}
                  </Select>
                )}
              />
            </div>

            <div className={style.inputBlock}>
              <p className={style.parag}>Industry</p>
              <Controller
                name="industry"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <>
                    <Select
                      size="small"
                      sx={{ width: "400px" }}
                      {...field}
                      label="industry"
                      variant="outlined"
                      error={!!errors.industry}
                      helperText={errors.industry ? "Select an option" : ""}
                    >
                      {INDUSTRIES_LEVELS.map((c) => (
                        <MenuItem value={c}>{c}</MenuItem>
                      ))}
                    </Select>
                  </>
                )}
              />
            </div>

            <div className={style.inputBlock}>
              <p className={style.parag}>Phone Number</p>
              <Controller
                name="phoneInput"
                control={control}
                render={({ field: { onChange, onBlur, value, ref } }) => (
                  <PhoneInput
                    className={style.phoneInput}
                    value={value}
                    international
                    countryCallingCodeEditable={false}
                    onChange={onChange}
                    defaultCountry="AM"
                    id="phone-input"
                  />
                )}
              />
            </div>

            <div className={style.inputBlock}>
              <p className={style.parag}>Your Company Image</p>
              <InputField
                border
                imageContent={image}
                img={img}
                name="image"
                type="file"
                placeholder="Your image"
                register={register}
                errors={errors}
                id="file"
              />
            </div>

            <div className={style.inputBlock}>
              <p className={style.parag}>Email</p>
              <Controller
                name="email"
                type="email"
                control={control}
                rules={{ required: "wrong email" }}
                render={({ field }) => (
                  <TextField
                    size="small"
                    sx={{ width: "400px" }}
                    {...field}
                    label="Your email"
                    variant="outlined"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    error={!!errors.email}
                    helperText={errors.email ? "Email is required" : ""}
                  />
                )}
              />
            </div>

            <div className={style.inputBlock}>
              <p className={style.parag}>Password</p>

              <Controller
                name="password"
                control={control}
                rules={{ required: "wrong password" }}
                render={({ field }) => (
                  <TextField
                    size="small"
                    sx={{ width: "400px" }}
                    {...field}
                    type="password"
                    label=" password"
                    variant="outlined"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    error={!!errors.password}
                    helperText={errors.password ? "password is required" : ""}
                  />
                )}
              />
            </div>

            <div className={style.inputBlock}>
              <p className={style.parag}>Repeat passsword</p>
              <Controller
                name="pas"
                control={control}
                rules={{ required: "wrong password" }}
                render={({ field }) => (
                  <TextField
                    size="small"
                    sx={{ width: "400px" }}
                    {...field}
                    type="password"
                    label=" password"
                    variant="outlined"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    error={!!errors.pas}
                    helperText={errors.pas ? "password is required" : ""}
                  />
                )}
              />
            </div>

            <div className={style.btnBlock}>
              <RegisterButton className={style.btn} type="submit">
                Register
              </RegisterButton>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
export default RegisterCompany;
