import {
  fade,
  makeStyles,
  Theme,
  createStyles,
} from "@material-ui/core/styles";

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    search: {
      position: "relative",
      border: "1px solid #DEDEDE",
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      "&:hover": {
        backgroundColor: fade(theme.palette.common.white, 0.25),
      },
      marginRight: theme.spacing(2),
      marginLeft: 0,
      width: "100%",
      [theme.breakpoints.up("sm")]: {
        marginLeft: theme.spacing(3),
        width: "auto",
      },
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: "100%",
      position: "absolute",
      pointerEvents: "none",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "#DEDEDE",
    },
    inputRoot: {
      color: "#000",
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create("width"),
      width: "100%",
      height: 15,
      [theme.breakpoints.up("md")]: {
        width: "20ch",
      },
    },

    appSection: {
      marginTop: 10,
    },
    appSectionIcons: {
      marginTop: 10,
      display: "flex",
    },
    inconleft: {
      marginLeft: 13,
    },
    smallAvatar: {
      marginLeft: 13,
      width: theme.spacing(4),
      height: theme.spacing(4),
    },
    iconColor: {
      color: "#000",
      fontSize:33
    },
  })
);
