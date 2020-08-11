import { makeStyles, createStyles } from "@material-ui/core";

export const useStyles = makeStyles(() =>
  createStyles({
    card: {
      minHeight: 500,
    },
    icon: {
      fontSize: 100,
      marginTop: 100,
    },
  })
);
