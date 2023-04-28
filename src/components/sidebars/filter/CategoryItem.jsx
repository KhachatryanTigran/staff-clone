import React from "react";
import Title from "./Title";
import { v4 as uuid } from "uuid";
import Checkbox from "./Checkbox";
import { useSelector, useDispatch } from "react-redux";
import { deleteFilter, setFilter } from "../../../store/slices/filterSlice";

const CategoryItem = ({ filterData }) => {
  const dispatch = useDispatch();

  const onChange = (value, e) => {
    e.target.checked
      ? dispatch(setFilter({ value, category: filterData.categoryType }))
      : dispatch(deleteFilter({ value, category: filterData.categoryType }));
  };

  return (
    <Title filterTitle={filterData.title}>
      {filterData.data.map((level) => (
        <Checkbox
          categoryType={filterData.categoryType}
          onChange={onChange}
          name={level.trim()}
          countJobs="9"
          key={uuid()}
        />
      ))}
    </Title>
  );
};

export default CategoryItem;
