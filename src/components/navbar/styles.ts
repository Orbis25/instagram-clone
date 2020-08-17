import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
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
      fontSize: 33,
    },
    hasNotification: {
      color: "#ED4956",
      fontSize: 33,
    },
    appBar: {
      background: "#fff",
      boxShadow: "none",
      border: "solid 1px #dbdbdb",
    },
    toggleMenu: {
      cursor: "pointer",
    },
    links: {
      fontSize: 14,
      color: "#A9A9A9 !important",
    },
    iconsMenu: {
      marginRight: 15,
    },
    textMenuIten: {
      marginBottom: 10,
      listStyleType: "none",
      color: "black",
      cursor: "pointer",
    },
  })
);
