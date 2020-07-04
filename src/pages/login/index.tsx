import React from "react";
import { Grid, Container, Card, CardContent, Hidden } from "@material-ui/core";
import { useStyles } from "./style";
import { Link } from "react-router-dom";

import { REGISTER } from "../../router/routes.json";

import AuthForm from "../../components/authForm";

const LoginPage = () => {
  const classes = useStyles();

  const Image = () => {
    return (
      <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
        <img src="/images/auth.jpg" alt="auth.jpg" />
      </Grid>
    );
  };

  const Form = () => {
    return (
      <Grid item xs={12} sm={8} md={8} lg={4} xl={4}>
        <Card className="custom-card">
          <CardContent>
            <img
              className={classes.imageForm}
              src="/images/logo.png"
              alt="logo.png"
            />
            <AuthForm />
          </CardContent>
        </Card>
        <Card className={`${classes.cardNotAccount} custom-card`}>
          <CardContent>
            <p>
              Don't have an account?{" "}
              <Link to={REGISTER} className={classes.sigUpText}>
                <b>Sign up</b>
              </Link>
            </p>
          </CardContent>
        </Card>
      </Grid>
    );
  };

  return (
    <Container className={classes.container}>
      <Grid container justify="center">
        <Hidden only={["sm", "xs", "md"]}>
          <Image />
        </Hidden>
        <Form />
      </Grid>
    </Container>
  );
};

export default LoginPage;
