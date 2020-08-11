import React from "react";
import { Card, Typography, CardContent } from "@material-ui/core";
import { useStyles } from "./style";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";

const NoFeed = () => {
  const classes = useStyles();
  return (
    <Card className={`${classes.card} custom-card text-center`}>
      <CardContent>
        <AccountCircleIcon className={classes.icon} />
        <Typography>Remember follow users for see the feed!</Typography>
      </CardContent>
    </Card>
  );
};

export default NoFeed;
