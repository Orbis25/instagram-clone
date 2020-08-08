import { makeStyles, createStyles } from "@material-ui/core";

export const useStyles = makeStyles(() =>
  createStyles({
    listItem: {
      width: 400,
    },
    dialog: {
      borderRadius: 100,
    },
    unfollowText: {
      color: "#ED4956",
    },
  })
);
