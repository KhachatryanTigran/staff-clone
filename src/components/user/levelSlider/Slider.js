import * as React from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import { useEffect } from "react";

export default function DiscreteSliderValues({
  levels,
  setLevel,
  level,
  disabled,
}) {
  useEffect(() => {
    setLevel(levels[0]);
  }, [levels]);

  const marks = levels.map((level, i) => {
    return {
      value: i,
      label: level,
    };
  });

  function valueLabelFormat(value) {
    return marks[value].label;
  }

  return (
    <Box sx={{ width: 300 }}>
      <Slider
        disabled={disabled}
        onChange={(event, value) => setLevel(marks[value].label)}
        color="customGreen"
        min={0}
        max={3}
        defaultValue={
          level && marks.findIndex((option) => option?.label === level)
        }
        valueLabelFormat={valueLabelFormat}
        step={1}
        valueLabelDisplay="auto"
        marks={marks}
        sx={{
          "& .MuiSlider-valueLabel": {
            color: "customGreen",
            fontWeight: "bold",
            fontSize: 14,
          },
        }}
      />
    </Box>
  );
}
