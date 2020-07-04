import { createStyles, makeStyles } from "@material-ui/core";
import { primary } from "../../utils/colors.json";
export const useStyles = makeStyles(() =>
  createStyles({
    root: {
      marginTop: 44,
    },
    imageCard: {
      display: "block",
      marginLeft: "auto",
      marginRight: "auto",
    },
    textFieldContainer: {
      marginBottom: 10,
    },
    btnSignUp: {
      background: primary,
      color: "#fff",
    },
    termText: {
      fontSize: 12,
    },
    haveAccoutCard: {
      marginTop: 20,
    },
    textHaveAccount: {
      fontSize: 13,
    },
    loginText: {
      textDecoration: "none",
      color: primary,
    },
  })
);
