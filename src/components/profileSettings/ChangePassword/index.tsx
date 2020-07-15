import React, { useState } from "react";
import {
  Grid,
  Container,
  TextField,
  Avatar,
  Typography,
  Button,
  CircularProgress,
} from "@material-ui/core";
import { useStyles } from "./style";
import { Formik } from "formik";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import routes from "../../../router/routes.json";
import { IChangePassword, ICurrentUser } from "../../../models/UserModel";
import { RootState } from "../../../redux/reducers";
import { validations } from "./util";
import AuthService from "../../../services/authService";

const ChangePassword = () => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const classes = useStyles();
  const service = new AuthService();
  const initialState: IChangePassword = {
    newPassword: "",
    oldPassword: "",
    confirmPassword: "",
  };

  const { photoURL, displayName, email }: ICurrentUser = useSelector(
    (state: RootState) => state.AuthReducer.user
  );

  const handleUpdatePassword = (
    values: IChangePassword,
    { resetForm }: any
  ) => {
    setIsLoading(true);
    const loginResult = service.login({
      email: email,
      password: values.oldPassword,
    });

    loginResult
      .then(() => {
        service.updatePassword(values.newPassword)?.then(() => {
          resetForm({});
          setErrorMessage(null);
          setSuccessMessage("Updated!");
          setTimeout(() => {
            setSuccessMessage(null);
          }, 4000);
        });
      })
      .catch((err: any) => {
        setErrorMessage(err.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <Container className={classes.container}>
      <Grid container justify="center">
        <Grid item xs={12}>
          <Grid container className={classes.userContainer}>
            <Grid item xs={2}></Grid>
            <Grid item xs={12} sm={2} md={1} lg={1} xl={1}>
              <Avatar
                className="center-image"
                src={photoURL ? photoURL : ""}
                alt="profile"
              />
            </Grid>
            <Grid item xs={12} sm={1} md={1} lg={1} xl={1}>
              <Typography align="center" variant="h5">
                {displayName}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Formik
            onSubmit={handleUpdatePassword}
            initialValues={initialState}
            validationSchema={validations}
          >
            {({ values, errors, handleBlur, handleChange, handleSubmit }) => (
              <form onSubmit={handleSubmit}>
                <Grid container justify="center">
                  <Grid item xs={8}>
                    <TextField
                      className={classes.texfields}
                      size="small"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.oldPassword}
                      error={errors.oldPassword ? true : false}
                      helperText={errors.oldPassword}
                      name="oldPassword"
                      fullWidth
                      type="password"
                      variant="outlined"
                      placeholder="Old password"
                    />
                  </Grid>
                  <Grid item xs={8}>
                    <TextField
                      value={values.newPassword}
                      className={classes.texfields}
                      size="small"
                      name="newPassword"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      fullWidth
                      error={errors.newPassword ? true : false}
                      helperText={errors.newPassword}
                      type="password"
                      variant="outlined"
                      placeholder="New password"
                    />
                  </Grid>
                  <Grid item xs={8}>
                    <TextField
                      className={classes.texfields}
                      size="small"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.confirmPassword}
                      name="confirmPassword"
                      fullWidth
                      error={errors.confirmPassword ? true : false}
                      helperText={errors.confirmPassword}
                      type="password"
                      variant="outlined"
                      placeholder="Confirm new password"
                    />
                  </Grid>
                  <Grid item xs={8}>
                    {isLoading ? (
                      <CircularProgress />
                    ) : (
                      <Button
                        type="submit"
                        className={classes.btn}
                        variant="contained"
                      >
                        Change password
                      </Button>
                    )}
                    <Link
                      className="no-text-decoration"
                      to={routes.RESET_PASSWORD}
                    >
                      <Typography className={classes.forgotPass}>
                        Forgot Password?
                      </Typography>
                      {errorMessage && (
                        <Typography align="center" className="text-error">
                          {errorMessage}
                        </Typography>
                      )}
                      {successMessage && (
                        <Typography align="center" className="text-success">
                          {successMessage}
                        </Typography>
                      )}
                    </Link>
                  </Grid>
                </Grid>
              </form>
            )}
          </Formik>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ChangePassword;
