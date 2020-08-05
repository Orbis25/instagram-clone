import React from "react";
import { Grid, Container } from "@material-ui/core";

import { useStyles } from "./style";
import ProfileBiography from "../../components/profileBiography";
import ProfileGalery from "../../components/profileTab";

const ProfilePage = () => {
  const classes = useStyles();
  return (
    <Container className={classes.container}>
      <Grid container justify="center" spacing={5}>
        <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
          <ProfileBiography />
        </Grid>
        <Grid item xs={12} sm={10} md={10} lg={10} xl={10}>
          <ProfileGalery />
        </Grid>
      </Grid>
    </Container>
  );
};

export default ProfilePage;
