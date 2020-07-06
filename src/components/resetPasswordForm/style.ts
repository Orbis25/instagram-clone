import { makeStyles, createStyles } from "@material-ui/core";

export const useStyles = makeStyles(() =>
  createStyles({
    input: {
      marginTop: 20,
      marginBottom: 20,
    },
    icon: {
      fontSize: 150,
      display: "block",
      marginLeft: "auto",
      marginRight: "auto",
      color: "#818181",
    },
  })
);
