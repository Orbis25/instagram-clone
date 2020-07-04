import React from "react";
import {
  TextField,
  Grid,
  Button,
  Typography,
  Container,
} from "@material-ui/core";
import FacebookIcon from "@material-ui/icons/Facebook";
import { Formik } from "formik";

import { primary } from "../../utils/colors.json";
import { useStyles } from "./styles";
import { AuthModel } from "../../models/AuthModels";
import validationScheme from "./validationSchema";
const AuthForm = () => {
  const initialValues: AuthModel = {
    email: "",
    password: "",
  };
  const classes = useStyles();

  const handlerLogin = (values: AuthModel): void => {
    console.log(values);
  };

  return (
    <Grid container spacing={1} justify="center">
      <Grid item xs={10}>
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
                <Grid item xs={12}>
                  <Button
                    style={{ background: primary, color: "#fff" }}
                    variant="contained"
                    size="small"
                    type="submit"
                    fullWidth
                  >
                    Log in
                  </Button>
                </Grid>
              </Grid>
            </form>
          )}
        </Formik>
      </Grid>

      <Grid item xs={10}>
        <Container className={classes.orContainer}>
          <Typography className={classes.orText}>OR</Typography>
          <Grid container justify="center">
            <Grid item xs={12}>
              <Button className={classes.facebookLink}>
                <FacebookIcon fontSize="small" />
                <p>Log in with Facebook</p>
              </Button>
              <p className={classes.forgotText}>Forgot password?</p>
            </Grid>
          </Grid>
        </Container>
      </Grid>
    </Grid>
  );
};

export default AuthForm;
