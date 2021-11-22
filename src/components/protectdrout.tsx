import React, { ReactElement } from "react";
import { Redirect, Route } from "react-router-dom";
import { useAppContext } from "../utils/context";

interface Props {
  children: React.ReactElement;
  path: string;
  exact?: boolean;
}

const ProtectRoute = ({ children, ...rest }: Props) => {
  const { user } = useAppContext();
  const isLogedIn = user._id ? true : false;
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
