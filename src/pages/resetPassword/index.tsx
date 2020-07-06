import React from "react";
import {
  Grid,
  Card,
  Typography,
  Container,
  CardContent,
} from "@material-ui/core";

import ResetPassForm from "../../components/resetPasswordForm";
import { useStyles } from "./style";
import { Link } from "react-router-dom";
import { LOGIN } from "../../router/routes.json";
const ResetPasswordPage = () => {
  const classes = useStyles();

  return (
    <Container className={classes.container}>
      <Grid container justify="center">
        <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
          <Card className="custom-card">
            <CardContent>
              <ResetPassForm />
            </CardContent>
          </Card>
          <Card className="custom-card">
            <CardContent>
              <Typography align="center">
                <Link to={LOGIN} className="no-text-decoration">
                  <b className="text-muted-primary">Back to Login</b>
                </Link>
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ResetPasswordPage;
