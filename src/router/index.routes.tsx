import React from "react";
import { BrowserRouter, Switch } from "react-router-dom";
import { Grid } from "@material-ui/core";
import { RouteProps, Route } from "react-router";

import AppBar from "../components/navbar";
import HomePage from "../pages/home";
import RegistePage from "../pages/register";
import LoginPage from "../pages/login";
import ResetPasswordPage from "../pages/resetPassword";

import { HOME, LOGIN, REGISTER, RESET_PASSWORD } from "./routes.json";
import { routes } from "./utils";
import { ProtectedRoute } from "./protected.routes";

const Router: React.FC<RouteProps> = (props) => {
  const Header: React.FC<RouteProps> = (props) => (
    <Grid item xs={12}>
      <AppBar {...props} />
    </Grid>
  );

  return (
    <Grid>
      <BrowserRouter>
        <Grid container>
          <Header {...props} />
          <Grid item xs={12}>
            <Switch>
              <Route path={REGISTER} component={RegistePage} />
              <Route path={LOGIN} component={LoginPage} />
              <Route path={RESET_PASSWORD} component={ResetPasswordPage} />
              <ProtectedRoute exact path={HOME} component={HomePage} />
              {routes.map((route, index) => (
                <ProtectedRoute
                  path={route.path}
                  component={route.component}
                  key={index}
                />
              ))}
            </Switch>
          </Grid>
        </Grid>
      </BrowserRouter>
    </Grid>
  );
};

export default Router;
