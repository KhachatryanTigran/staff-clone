import * as React from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import BasicButtons from "../../../UI/Button";
import styles from "./limitTags.module.scss";
import { useState } from "react";
export default function LimitTags({ update, onClick, handleClose }) {
  const options = React.useMemo(() => {
    return update?.data.options.map((option) => {
      return { title: option };
    });
  }, [update]);

  const [tags, setTags] = useState([]);

  React.useEffect(() => {
    if (update?.cvInfo?.formData) {
      setTags(update?.cvInfo?.formData);
    }
  }, [update]);

  const handleClick = () => {
    if (tags) {
      onClick(tags);
      setTags([]);
    }
  };

  return (
    <div className={styles.mainBox}>
      <div>
        <span>{update.data?.title}</span>
      </div>
      <Autocomplete
        onChange={(event, value) => setTags(value)}
        multiple
        limitTags={2}
        options={options}
        getOptionLabel={(option) => option.title}
        filterOptions={(options, state) => {
          const filteredOptions = options?.filter(
            (option) =>
              state.inputValue === "" ||
              option.title
                .toLowerCase()
                .includes(state.inputValue.toLowerCase())
          );
          return filteredOptions;
        }}
        getOptionDisabled={(option) => {
          if (tags?.some((tag) => tag.title === option.title)) {
            return true;
          }

          return false;
        }}
        value={tags}
        renderInput={(params) => <TextField color="customGreen" {...params} />}
        sx={{ width: "500px" }}
      />
      <div className={styles.buttonBlock}>
        {" "}
        <BasicButtons onClick={handleClick}>Save</BasicButtons>
        <BasicButtons onClick={handleClose}>Cancel</BasicButtons>
      </div>
    </div>
  );
}
