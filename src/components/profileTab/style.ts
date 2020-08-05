import { makeStyles, createStyles } from "@material-ui/core";

export const useStyles = makeStyles(() =>
  createStyles({
    indicator: {
      background: "blue",
      "& > span": {
        maxWidth: 40,
        width: "100%",
        backgroundColor: "#635ee7",
      },
    },
  })
);
