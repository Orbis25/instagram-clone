import React from "react";
import { Grid, Typography, Button, Avatar } from "@material-ui/core";

import { useStyles } from "./style";

const ProfileBiography = () => {
  const classes = useStyles();

  return (
    <Grid container justify="center">
      <Grid item xs={12} sm={12} md={4} xl={4} lg={4}>
        <Avatar
          className={classes.avatar}
          alt="profile"
          src="https://thumbs.dreamstime.com/b/default-avatar-profile-icon-social-media-user-vector-default-avatar-profile-icon-social-media-user-vector-portrait-176194876.jpg"
        />
      </Grid>
      <Grid item xs={12} sm={12} md={8} xl={8} lg={8}>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Typography className={classes.userName}>
              orbisalonzogutierrez
              <Button
                className={classes.btnEdit}
                size="small"
                variant="outlined"
              >
                Edit profile
              </Button>
            </Typography>
          </Grid>
          <Grid className={classes.quantitySectionContainer} item xs={12}>
            <span className={classes.quantitySection}>
              <b>100</b> posts
            </span>
            <span className={classes.quantitySection}>
              <b>100</b> followers
            </span>
            <span>
              <b>100</b> following
            </span>
          </Grid>
        </Grid>
        <Typography>
          <b>Orbis Alonzo Gutierrez</b>
        </Typography>
        <Typography>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi, porro
          hic quisquam voluptatibus perspiciatis ratione eaque repellendus
          sequi, optio minima quas laudantium voluptates! Libero corporis neque
          sint recusandae illum in.
        </Typography>
      </Grid>
    </Grid>
  );
};

export default ProfileBiography;
