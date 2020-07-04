import React from "react";
import { Grid, Container } from "@material-ui/core";

import RegisterForm from "../../components/registerForm";
import { useStyles } from "./style";

const RegisterPage = () => {
  const classes = useStyles();
  return (
    <Container className={classes.root}>
      <Grid container justify="center">
        <Grid item xs={12} sm={12} md={6} xl={4} lg={4}>
          <RegisterForm />
        </Grid>
      </Grid>
    </Container>
  );
};

export default RegisterPage;
