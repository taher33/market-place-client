import React, { ReactElement } from "react";
import { Redirect, Route } from "react-router-dom";

const isLogedIn = true;

interface Props {
  children: React.ReactElement;
  path: string;
  exact?: boolean;
}

const ProtectRoute = ({ children, ...rest }: Props) => {
  return (
    <Route
      {...rest}
      render={() =>
        isLogedIn ? children : <Redirect to={{ pathname: "/login" }} />
      }
    />
  );
};

export default ProtectRoute;
