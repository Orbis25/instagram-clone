import { makeStyles, createStyles } from "@material-ui/core";
import { primary } from "../../utils/colors.json";
export const useStyles = makeStyles(() =>
  createStyles({
    container: {
      marginTop: 44,
    },
    imageForm: {
      display: "block",
      marginRight: "auto",
      marginLeft: "auto",
      marginBottom: 40,
      marginTop: 20,
    },
    cardForm: {
      borderRadius: 0,
      boxShadow: "0px !important",
    },
    cardNotAccount: {
      marginTop: 10,
      textAlign: "center",
      fontSize: 13,
    },
    sigUpText: {
      color: primary,
      textDecoration: "none !important",
    },
  })
);
