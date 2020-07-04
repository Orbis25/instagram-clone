import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Grid } from "@material-ui/core";
import { RouteProps } from "react-router";

import AppBar from "../components/navbar";
import HomePage from "../pages/home";

import { HOME } from "./routes.json";

import { routes } from "./utils";

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
              <Route exact path={HOME} component={HomePage} />
              {routes.map((route, index) => (
                <Route
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
