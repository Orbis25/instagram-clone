import { makeStyles, createStyles } from "@material-ui/core";
import { primary } from "../../../utils/colors.json";

export const useStyles = makeStyles(() =>
  createStyles({
    container: {
      marginTop: 40,
    },
    texfields: {
      marginBottom: 15,
    },
    userContainer: {
      marginBottom: 20,
    },
    btn: {
      marginBottom: 20,
      background: `${primary} !important`,
      color: "#fff",
    },
    forgotPass: {
      color: primary,
      cursor: "pointer",
    },
  })
);
