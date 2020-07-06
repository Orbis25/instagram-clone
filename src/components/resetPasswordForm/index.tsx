import React, { useState } from "react";
import {
  Grid,
  Container,
  Typography,
  TextField,
  Button,
  CircularProgress,
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";

import { primary } from "../../utils/colors.json";
import { useStyles } from "./style";
import { Link } from "react-router-dom";
import { REGISTER } from "../../router/routes.json";
import AuthService from "../../services/authService";
const ResetPasswordForm = () => {
  const [email, setEmail] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [inputError, setInputError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const classes = useStyles();
  const handlerSubmit = () => {
    if (email?.length) {
      setInputError(null);
      setIsLoading(true);
      const service = new AuthService();
      service
        .ressetPassword(email)
        .then(() => {
          setSuccessMessage("email sended!");
        })
        .catch(({ message }) => {
          setErrorMessage(message);
        })
        .finally(() => setIsLoading(false));
    } else {
      setInputError("required");
    }
  };

  const _renderMessage = () => {
    if (errorMessage) {
      return (
        <Typography align="center" className="text-error">
          {errorMessage}
        </Typography>
      );
    } else if (successMessage) {
      return (
        <Typography align="center" className="text-success">
          {successMessage}
        </Typography>
      );
    }
    return null;
  };

  return (
    <Container>
      <Grid container justify="center" spacing={2}>
        <Grid item xs={12}>
          <LockOutlinedIcon className={classes.icon} fontSize="large" />
          <Typography align="center" className="text-muted-primary">
            Enter your username or email and we'll send you a link to get back
            into your account.
          </Typography>
          <TextField
            className={classes.input}
            placeholder="Email"
            fullWidth
            variant="outlined"
            size="small"
            error={inputError ? true : false}
            helperText={inputError}
            onChange={(e) => setEmail(e.target.value)}
          />
          {isLoading ? (
            <div className="text-center">
              <CircularProgress
                className="text-center"
                color="primary"
                size={30}
              />
            </div>
          ) : (
            <Button
              variant="contained"
              style={{ background: primary, color: "#fff" }}
              size="small"
              fullWidth
              onClick={handlerSubmit}
            >
              Send Login Link
            </Button>
          )}
        </Grid>
        <Grid item xs={12}>
          {_renderMessage()}
          <Typography align="center">OR</Typography> <br></br>
          <Typography align="center">
            <b>
              <Link
                to={REGISTER}
                className="no-text-decoration text-muted-primary"
              >
                Create New Account
              </Link>
            </b>
          </Typography>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ResetPasswordForm;
