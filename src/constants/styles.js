import { createTheme } from "@mui/material/styles";
export const COLORS = {
  customRed: "#e14c4c",
  customGreen: "#46af3a",
  customWhite: "#fff",
  customBlack: "#333",
  customGray: "rgba(0, 0, 0, 0.5)",
};
export const theme = createTheme({
  typography: {
    simple: { fontSize: 12 },
  },
  components: {
    MuiAvatar: {
      variants: [
        {
          props: { variant: "Avatar" },
          style: {
            width: 56,
            height: 56,
            borderRadius: 5,
            "&:hover": {
              border: `1px solid ${COLORS.customBlack}`,
              transform: "scale(1.1)",
              transition: "1s",
            },
          },
        },
        {
          props: { variant: "CheckBoxAvatar" },
          style: {
            width: "34px",
            height: "34px",
            padding: "4px",
          },
        },
      ],
    },
    MuiSvgIcon: {
      variants: [
        {
          props: { variant: "heart" },
          style: {
            width: "18px",
            marginRight: "5px",
          },
        },
        {
          props: { variant: "remove" },
          style: {
            cursor: "pointer",
            width: "30px",
            marginLeft: "5px",
            color: COLORS.customGray,
          },
        },
      ],
    },

    MuiButton: {
      variants: [
        {
          props: { variant: "HomeBtn" },
          style: {
            width: "50px",
            fontWeight: "700",
            backgroundColor: "transparent",
            color: COLORS.customWhite,
            "&:hover": {
              backgroundColor: COLORS.customWhite,
              color: COLORS.customGreen,
            },
          },
        },
        {
          props: { variant: "LogOut" },
          style: {
            width: "50px",

            fontWeight: "700",
            backgroundColor: "transparent",
            color: COLORS.customGray,
            "&:hover": {
              color: COLORS.customBlack,
            },
          },
        },
        {
          props: { variant: "Follow" },
          style: {
            maxHeight: "35px",
            textTransform: "none",
            border: `1px solid ${COLORS.customRed}`,

            color: COLORS.customRed,
            backgroundColor: COLORS.customWhite,
            " &:hover": {
              backgroundColor: COLORS.customRed,
              color: COLORS.customWhite,
            },
          },
        },
        {
          props: { variant: "ViewMore" },
          style: {
            maxHeight: "35px",
            textTransform: "none",
            border: `1px solid ${COLORS.customGreen}`,

            color: COLORS.customGreen,
            backgroundColor: COLORS.customWhite,
            " &:hover": {
              backgroundColor: COLORS.customGreen,
              color: COLORS.customWhite,
            },
          },
        },
        {
          props: { variant: "solid" },
          style: {
            textTransform: "none",
            border: `1px solid ${COLORS.customGreen}`,
            borderRadius: "0",
            color: COLORS.customWhite,
            backgroundColor: COLORS.customGreen,
            " &:hover": {
              color: COLORS.customWhite,
              backgroundColor: COLORS.customGreen,
            },
          },
        },
      ],
    },
  },
  palette: {
    student0: {
      light: "#757ce8",
      main: "#ff7f50",
      dark: "#ff7f50",
      contrastText: COLORS.customWhite,
    },
    student1: {
      light: "#ff7961",
      main: "#9c27b0",
      dark: "#9c27b0",
      contrastText: "#000",
    },
    student2: {
      light: "#757ce8",
      main: "#673ab7",
      dark: "#673ab7",
      contrastText: COLORS.customWhite,
    },
    student3: {
      light: "#757ce8",
      main: "#00bcd4",
      dark: "#00bcd4",
      contrastText: COLORS.customWhite,
    },
    student4: {
      light: "#757ce8",
      main: "#009688",
      dark: "#009688",
      contrastText: COLORS.customWhite,
    },
    student5: {
      light: "#757ce8",
      main: "#07689f",
      dark: "#07689f",
      contrastText: COLORS.customWhite,
    },
    customGreen: {
      light: "#757ce8",
      main: COLORS.customGreen,
      dark: "#07689f",
      contrastText: COLORS.customWhite,
    },

    customRed: {
      light: "#757ce8",
      main: COLORS.customRed,
      dark: "#07689f",
      contrastText: COLORS.customWhite,
    },
  },
});

theme.spacing(2);

// theme.typography.h3 = {
//   fontSize: "1.2rem",
//   "@media (min-width:600px)": {
//     fontSize: "1.5rem",
//   },

//   [theme.breakpoints.up("md")]: {
//     fontSize: "2.4rem",
//   },
// };
