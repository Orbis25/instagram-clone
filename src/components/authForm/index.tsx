import React, { useState } from "react";
import {
  TextField,
  Grid,
  Button,
  Typography,
  Container,
  CircularProgress,
} from "@material-ui/core";
import FacebookIcon from "@material-ui/icons/Facebook";
import { Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, Link } from "react-router-dom";

import { primary } from "../../utils/colors.json";
import { useStyles } from "./styles";
import { AuthModel } from "../../models/AuthModels";
import {
  authenticatedUser,
  authenticatedUserWithFb,
} from "../../redux/actions/users/auth";
import validationScheme from "./validationSchema";
import { RootState } from "../../redux/reducers";
import { RESET_PASSWORD } from "../../router/routes.json";
const AuthForm = () => {
  const initialValues: AuthModel = {
    email: "",
    password: "",
  };
  const classes = useStyles();
  const dispach = useDispatch();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { errorMessage, isAutenticated } = useSelector(
    (state: RootState) => state.AuthReducer
  );

  const handlerLogin = (values: AuthModel): void => {
    setIsLoading(true);
    dispach(authenticatedUser(values));
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  };

  const handleWithFacebookLogin = () => {
    setIsLoading(true);
    dispach(authenticatedUserWithFb());
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  };

  return (
    <Grid container spacing={1} justify="center">
      <Grid item xs={10}>
        {isAutenticated && <Redirect to="/" />}
        <Formik
          validationSchema={validationScheme}
          initialValues={initialValues}
          onSubmit={(values) => handlerLogin(values)}
        >
          {({ values, errors, handleBlur, handleChange, handleSubmit }) => (
            <form style={{ width: "100%" }} onSubmit={handleSubmit}>
              <Grid container spacing={1}>
                <Grid item xs={12}>
                  <TextField
                    size="small"
                    placeholder="email"
                    variant="outlined"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    fullWidth
                    error={errors.email ? true : false}
                    helperText={errors.email}
                    value={values.email}
                    name="email"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    size="small"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="password"
                    variant="outlined"
                    name="password"
                    type="password"
                    error={errors.password ? true : false}
                    helperText={errors.password}
                    value={values.password}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} className="text-center">
                  {isLoading ? (
                    <CircularProgress size={25} />
                  ) : (
                    <Button
                      style={{ background: primary, color: "#fff" }}
                      variant="contained"
                      size="small"
                      type="submit"
                      fullWidth
                    >
                      Log in
                    </Button>
                  )}
                </Grid>
              </Grid>
            </form>
          )}
        </Formik>
      </Grid>

      <Grid item xs={10}>
        <Container className={classes.orContainer}>
          {errorMessage && (
            <p className="text-center text-error">{errorMessage}</p>
          )}
          <Typography className={classes.orText}>OR</Typography>
          <Grid container justify="center">
            <Grid item xs={12}>
              <Button
                onClick={handleWithFacebookLogin}
                className={classes.facebookLink}
              >
                <FacebookIcon fontSize="small" />
                <p>Log in with Facebook</p>
              </Button>

              <p className={classes.forgotText}>
                <Link className="no-text-decoration" to={RESET_PASSWORD}>
                  Forgot password?
                </Link>
              </p>
            </Grid>
          </Grid>
        </Container>
      </Grid>
    </Grid>
  );
};

export default AuthForm;
