import { makeStyles, createStyles, Theme } from "@material-ui/core";

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    avatar: {
      width: theme.spacing(20),
      height: theme.spacing(20),
    },
    userName: {
      fontSize: 30,
      fontWeight: "normal",
    },
    btnEdit: {
      marginLeft: 20,
      boxShadow: "none",
      background: "#FAFAFA",
      border: "solid 1px #dbdbdb",
      height: 30,
    },
    quantitySectionContainer: {
      marginBottom: 20,
    },
    quantitySection: {
      marginRight: 50,
    },
  })
);
