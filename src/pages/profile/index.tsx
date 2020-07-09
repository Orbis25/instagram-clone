import React from "react";
import { Grid, Container } from "@material-ui/core";

import { useStyles } from "./style";
import ProfileBiography from "../../components/profileBiography";

const ProfilePage = () => {
  const classes = useStyles();
  return (
    <Container className={classes.container}>
      <Grid container justify="center">
        <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
          <ProfileBiography />
        </Grid>
      </Grid>
    </Container>
  );
};

export default ProfilePage;
