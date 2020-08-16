import { makeStyles, createStyles } from "@material-ui/core";

export const useStyles = makeStyles(() =>
  createStyles({
    card: {
      maxWidth: "100%",
      height:"auto",
      marginTop: 30,
      marginBottom: 30,
    },
    cardImage: {
      maxWidth: "100%",
    },
    userPoted: {
      marginTop: 1,
      marginBottom: 1,
    },
    userNamePosted: {
      marginTop: 8,
      fontSize: 14,
    },
    commentsContainer: {
      marginTop: 15,
      height: "70%",
      overflow: "auto",
      overflowX: "hidden",
    },
  })
);
