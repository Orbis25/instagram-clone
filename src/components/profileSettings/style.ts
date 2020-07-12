import { makeStyles, createStyles, Theme } from "@material-ui/core";
import { primary } from "../../utils/colors.json";
export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.paper,
      display: "flex",
      height: 700,
    },
    tabs: {
      borderRight: `1px solid ${theme.palette.divider}`,
      width: 250,
    },

    editProfileContent: {
      marginTop: 40,
    },
    userNameText: {
      fontSize: 20,
    },
    changeProfilePhotoText: {
      color: primary,
      cursor: "pointer",
      fontSize: 14,
    },
    editProfileForm: {
      marginTop: 20,
    },
    textFields: {
      marginBottom: 20,
    },
  })
);
