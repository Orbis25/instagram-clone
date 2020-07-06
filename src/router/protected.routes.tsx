import React from "react";
import { Redirect } from "react-router-dom";
import { LOGIN } from "./routes.json";

type ComponentProps = {
  component: React.FC;
};

const ProtectedRoute: React.FC<ComponentProps> = ({ component }) => {
  const isAutenticated = true;
  const Component = component;

  return isAutenticated ? <Component /> : <Redirect to={LOGIN} />;
};

export default ProtectedRoute;
