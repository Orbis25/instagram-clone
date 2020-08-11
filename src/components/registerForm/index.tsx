import React, { useState } from "react";
import {
  Card,
  CardContent,
  Container,
  Grid,
  TextField,
  Button,
  Typography,
  CircularProgress,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import { Formik } from "formik";

import { useStyles } from "./style";
import { LOGIN } from "../../router/routes.json";
import { RegisterModel } from "../../models/AuthModels";
import ValidationSchema from "./validationsForm";
import AuthService from "../../services/authService";
import UserService from "../../services/userService";
import { useHistory } from "react-router-dom";

const RegisterForm = () => {
  const history = useHistory();
  const classes = useStyles();
  const [isErrorMesssage, setIsErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<Boolean>(false);

  const model: RegisterModel = {
    email: "",
    fullName: "",
    password: "",
    userName: "",
  };

  const handlerSubmit = async (values: RegisterModel) => {
    setIsLoading(true);
    const service = new AuthService();
    const userService = new UserService();
    const result = await userService.getUserByUserName(values.userName);
    if (result.empty) {
      try {
        const { user } = await service.createUser(values);
        if (user !== null) {
          service
            .addUserDetail({
              uidUser: user?.uid,
              email: values.email,
              fullName: values.fullName,
              userName: values.userName,
              biography: "",
              gender: "Male",
              phoneNumber: "",
              photoURL: "",
              website: "",
            })
            .then(() => {
              history.push(LOGIN);
            })
            .catch((error) => {
              console.log(error);
              setIsErrorMessage(error.message);
            })
            .finally(() => {
              setIsLoading(false);
            });
        }
      } catch (error) {
        setIsLoading(false);
        setIsErrorMessage(error.message);
      }
    } else {
      setIsLoading(false);
      setIsErrorMessage("This username was taken!");
    }
  };

  const HaveAccount = () => {
    return (
      <Card className={`custom-card ${classes.haveAccoutCard}`}>
        <CardContent>
          <p className={`text-center ${classes.textHaveAccount}`}>
            Have an account?{" "}
            <Link to={LOGIN} className={classes.loginText}>
              Log in
            </Link>
          </p>
        </CardContent>
      </Card>
    );
  };

  return (
    <Container>
      <Grid container>
        <Grid item xs={12}></Grid>
        <Grid item xs={12}>
          <Card className="custom-card">
            <CardContent>
              <img
                className={classes.imageCard}
                src="/images/logo.png"
                alt="logo.png"
              />
              <p className="text-muted-primary text-center">
                <b>Sign up to see photos and videos from your friends.</b>
              </p>
              <Formik
                initialValues={model}
                onSubmit={(values) => {
                  handlerSubmit(values);
                }}
                validationSchema={ValidationSchema}
              >
                {({
                  values,
                  errors,
                  handleChange,
                  handleBlur,
                  handleSubmit,
                }) => (
                  <form onSubmit={handleSubmit}>
                    <Grid container justify="center">
                      <Grid item xs={10} className={classes.textFieldContainer}>
                        <TextField
                          placeholder="Email"
                          fullWidth
                          name="email"
                          variant="outlined"
                          size="small"
                          error={errors.email ? true : false}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.email}
                          helperText={errors.email}
                        />
                      </Grid>
                      <Grid item xs={10} className={classes.textFieldContainer}>
                        <TextField
                          placeholder="Full Name"
                          fullWidth
                          name="fullName"
                          variant="outlined"
                          size="small"
                          error={errors.fullName ? true : false}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.fullName}
                          helperText={errors.fullName}
                        />
                      </Grid>
                      <Grid item xs={10} className={classes.textFieldContainer}>
                        <TextField
                          placeholder="UserName"
                          fullWidth
                          name="userName"
                          variant="outlined"
                          size="small"
                          error={errors.userName ? true : false}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.userName}
                          helperText={errors.userName}
                        />
                      </Grid>
                      <Grid item xs={10} className={classes.textFieldContainer}>
                        <TextField
                          placeholder="Password"
                          fullWidth
                          name="password"
                          type="password"
                          variant="outlined"
                          size="small"
                          error={errors.password ? true : false}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.password}
                          helperText={errors.password}
                        />
                      </Grid>
                      <Grid
                        className={`text-center ${classes.textFieldContainer}`}
                        item
                        xs={10}
                      >
                        {isLoading ? (
                          <CircularProgress size={40} />
                        ) : (
                          <Button
                            className={classes.btnSignUp}
                            fullWidth
                            variant="contained"
                            size="small"
                            type="submit"
                          >
                            <b>Sign up</b>
                          </Button>
                        )}
                      </Grid>
                    </Grid>
                  </form>
                )}
              </Formik>
              <Grid container justify="center">
                <Grid item xs={10} className={classes.textFieldContainer}>
                  <Typography className={classes.termText}>
                    By signing up, you agree to our <b>Terms, Data Policy</b>{" "}
                    and <b>Cookies Policy</b> .
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  {isErrorMesssage && (
                    <Typography
                      color="error"
                      className={`text-center ${classes.termText}`}
                    >
                      {isErrorMesssage}
                    </Typography>
                  )}
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12}>
          <HaveAccount />
        </Grid>
      </Grid>
    </Container>
  );
};

export default RegisterForm;
