import { makeStyles, createStyles } from "@material-ui/core";
import { primary } from "../../utils/colors.json";

export const useStyles = makeStyles(() =>
  createStyles({
    cardContainer: {
      maxWidth: "100%",
      marginBottom: 20,
    },
    avatar: {
      width: 30,
      height: 30,
    },
    imagePost: {
      height: 600,
    },
    iconSave: {
      marginLeft: "auto",
    },
    textPost: {
      fontSize: 14,
    },
    inputCommentContainer: {
      marginTop: 20,
    },
    btnComment: {
      color: primary,
    },
  })
);
