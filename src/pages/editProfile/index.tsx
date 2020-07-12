import React from "react";
import { Grid, Container } from "@material-ui/core";

import { useStyles } from "./style";
import ProfileSettings from '../../components/profileSettings'


const EditProfilePage = () => {
  const classes = useStyles();
  return (
    <Container className={classes.container}>
      <Grid container justify="center">
        <Grid item xs={12} sm={12} md={10} lg={10} xl={10}>
          <ProfileSettings />
        </Grid>
      </Grid>
    </Container>
  );
};

export default EditProfilePage;
