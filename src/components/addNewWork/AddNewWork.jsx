import React, { useEffect, useState } from "react";
import style from "./addNewWork.module.scss";

import TextEditor from "../textEditor/TextEditor";
import { useForm } from "react-hook-form";

import { changeJobSlice } from "../../store/slices/newJobSlice";

import { useDispatch, useSelector } from "react-redux";

import Select from "../select/Select";
import TextField from "@mui/material/TextField";
import { useNavigate, useParams } from "react-router";
import BasicButtons from "../../UI/Button";
import InputField from "../login/input/Input";
import {
  COMPANY__INDUSTRIES,
  LEVEL_CATEGORY,
  JOB_TYPE,
  CITIES,
  JOB__CATEGORY,
} from "../../constants/category";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";

const AddNewWork = () => {
  const params = useParams();
  const id = params.id;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const selectEditor = useSelector((state) => state.newJobSlice);

  const [editorData, setEditorData] = useState({
    description: selectEditor.description,
    responsibilities: selectEditor.responsibilities,
    qualifications: selectEditor.qualifications,
    additionalInformation: selectEditor.additionalInformation,
  });

  const [defaultValue, setDefaultValue] = useState({
    description: selectEditor.description,
    responsibilities: selectEditor.responsibilities,
    qualifications: selectEditor.qualifications,
    additionalInformation: selectEditor.additionalInformation,
  });

  useEffect(() => {
    const getData = async () => {
      const docRef = doc(db, "jobs", id);
      const data = await getDoc(docRef);
      setDefaultValue({
        description: data.data().description,
        responsibilities: data.data().responsibilities,
        qualifications: data.data().qualifications,
        additionalInformation: data.data().additionalInformation,
      });
      setEditorData({
        description: data.data().description,
        responsibilities: data.data().responsibilities,
        qualifications: data.data().qualifications,
        additionalInformation: data.data().additionalInformation,
      });
      dispatch(
        changeJobSlice({
          description: data.data().description,
          responsibilities: data.data().responsibilities,
          qualifications: data.data().qualifications,
          additionalInformation: data.data().additionalInformation,
          category: data.data().category,
          date: data.data().date,
          industry: data.data().industry,
          jobName: data.data().jobName,
          level: data.data().level,
          location: data.data().location,
          JobType: data.data().JobType,
        })
      );
    };
    getData();
  }, []);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    mode: "all",
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const onSubmit = (data) => {
    dispatch(
      changeJobSlice({
        description: editorData.description,
        responsibilities: editorData.responsibilities,
        qualifications: editorData.qualifications,
        additionalInformation: editorData.additionalInformation,
        category: data.category,
        date: data.date,
        industry: data.industry,
        jobName: data.jobName,
        level: data.level,
        location: data.location,
        JobType: data.JobType,
      })
    );

    id ? navigate(`/jobInfoToCompany/${id}`) : navigate(`/jobInfo`);
  };

  return (
    <div className={style.addBlock}>
      <div className="container">
        <form className={style.form} onSubmit={handleSubmit(onSubmit)}>
          <div className={style.item}>
            <h3>Job Name</h3>
            <TextField
              defaultValue={selectEditor.jobName}
              sx={{ width: "100%" }}
              name="jobName"
              color="success"
              InputLabelProps={{
                shrink: true,
              }}
              label="Job Name"
              variant="outlined"
              {...register("jobName", { required: "required your job name" })}
              error={!!errors.jobName}
              helperText={errors?.jobName ? errors?.jobName.message : null}
            />
          </div>
          <div className={style.item}>
            <h3>Job Idustry</h3>
            <Select
              addstyles={true}
              value={selectEditor.industry}
              name="industry"
              register={register}
              errors={errors}
              options={COMPANY__INDUSTRIES.data}
            />
          </div>

          <div className={style.item}>
            <h3>Job Type</h3>
            <Select
              addstyles={true}
              value={selectEditor.JobType}
              name="JobType"
              register={register}
              errors={errors}
              options={JOB_TYPE.data}
            />
          </div>

          <div className={style.item}>
            <h3>Job Category</h3>
            <Select
              addstyles={true}
              value={selectEditor.category}
              name="category"
              register={register}
              errors={errors}
              options={JOB__CATEGORY.data}
            />
          </div>

          <div className={style.item}>
            <h3>Job Location</h3>
            <Select
              addstyles={true}
              name="location"
              value={selectEditor.location}
              register={register}
              errors={errors}
              options={CITIES.data}
            />
          </div>

          <div className={style.item}>
            <h3>Required candidate level</h3>
            <Select
              addstyles={true}
              name="level"
              value={selectEditor.level}
              register={register}
              errors={errors}
              options={LEVEL_CATEGORY.data}
            />
          </div>

          <div className={style.item}>
            <h3>Deadline</h3>
            <InputField
              defaultValue={selectEditor.date}
              type="date"
              register={register}
              name="date"
              errors={errors}
            />
          </div>

          <div className={style.itemEditor}>
            <h3>Job description</h3>
            <TextEditor
              value={defaultValue?.description}
              onChange={(editorState) => {
                setEditorData({
                  ...editorData,
                  description: editorState,
                });
              }}
            />
          </div>

          <div className={style.itemEditor}>
            <h3>Job Responsibilities</h3>
            <TextEditor
              onChange={(editorState) => {
                setEditorData({
                  ...editorData,
                  responsibilities: editorState,
                });
              }}
              value={defaultValue?.responsibilities}
            />
          </div>

          <div className={style.itemEditor}>
            <h3>Job Qualifications</h3>
            <TextEditor
              value={defaultValue?.qualifications}
              onChange={(editorState) => {
                setEditorData({
                  ...editorData,
                  qualifications: editorState,
                });
              }}
            />
          </div>

          <div className={style.itemEditor}>
            <h3>Additional information</h3>
            <TextEditor
              value={defaultValue?.additionalInformation}
              onChange={(editorState) => {
                setEditorData({
                  ...editorData,
                  additionalInformation: editorState,
                });
              }}
            />
          </div>

          <BasicButtons type="submit">Save</BasicButtons>
        </form>
      </div>
    </div>
  );
};

export default AddNewWork;
