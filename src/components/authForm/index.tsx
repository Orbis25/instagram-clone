import React from "react";
import {
  TextField,
  Grid,
  Button,
  Typography,
  Container,
} from "@material-ui/core";
import FacebookIcon from "@material-ui/icons/Facebook";

import { primary } from "../../utils/colors.json";
import { useStyles } from "./styles";



const AuthForm = () => {
  const classes = useStyles();
  return (
    <Grid container spacing={1} justify="center">
      <Grid item xs={10}>
        <TextField
          size="small"
          placeholder="email"
          variant="outlined"
          fullWidth
        />
      </Grid>
      <Grid item xs={10}>
        <TextField
          size="small"
          placeholder="password"
          variant="outlined"
          fullWidth
        />
      </Grid>
      <Grid item xs={10}>
        <Button
          style={{ background: primary, color: "#fff" }}
          variant="contained"
          size="small"
          fullWidth
        >
          Log in
        </Button>
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
