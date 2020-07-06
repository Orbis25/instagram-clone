import { makeStyles, createStyles } from "@material-ui/core";

export const useStyles = makeStyles(() =>
  createStyles({
    orContainer: {
      marginTop: 20,
      textAlign: "center",
    },
    orText: {
      marginBottom: 10,
      textAlign: "center",
    },
    facebookLink: {
      color: "#385185",
      fontSize: 13,
    },
    forgotText: {
      fontSize: 12,
      textDecoration: "none",
    },
  })
);
