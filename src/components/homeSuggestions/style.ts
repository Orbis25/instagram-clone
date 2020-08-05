import { makeStyles, createStyles } from "@material-ui/core";
import { primary } from "../../utils/colors.json";

export const useStyles = makeStyles(() =>
  createStyles({
    avatarProfile: {
      width: 50,
      height: 50,
    },
    suggestionText: {
      marginTop: 20,
      fontSize: 12,
    },
    seeAllSuggesstions: {
      fontSize: 12,
    },
    followText: {
      fontSize: 12,
      color: primary,
      cursor: "pointer",
    },
    inputPost: {
      fontWeight: "normal",
    },
    rootGridList: {
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "space-around",
      overflow: "hidden",
      marginTop: 100,
    },
    gridList: {
      flexWrap: "nowrap",
      transform: "translateZ(0)",
    },
  })
);
