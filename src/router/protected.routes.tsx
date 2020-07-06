import React from "react";
import { Redirect, Route } from "react-router-dom";
import { LOGIN } from "./routes.json";
import { useSelector } from "react-redux";
import { RootState } from "../redux/reducers";

type ComponentProps = {
  component: React.FC;
  path: string;
  exact?: boolean | undefined;
};

export const ProtectedRoute: React.FC<ComponentProps> = ({
  component,
  path,
  exact,
}) => {
  const { isAutenticated } = useSelector(
    (state: RootState) => state.AuthReducer
  );

  return isAutenticated ? (
    <Route exact={exact} path={path} component={component} />
  ) : (
    <Redirect to={LOGIN} />
  );
};
