import React from "react";
import { Redirect, Route } from "react-router-dom";
import { useAppContext } from "../utils/context";
import FullPageLoader from "./fullPageLoader";

interface Props {
  children: React.ReactElement;
  loading: boolean;
  path: string;
  exact?: boolean;
}

const ProtectRoute = ({ children, loading, ...rest }: Props) => {
  const { user } = useAppContext();

  const isLogedIn = user?._id ? true : false;
  return (
    <Route
      {...rest}
      render={() =>
        loading ? (
          <div
            style={{
              display: "flex",
              marginTop: "2rem",
              justifyContent: "center",
            }}
          >
            <FullPageLoader />
          </div>
        ) : isLogedIn ? (
          children
        ) : (
          <Redirect to={{ pathname: "/login" }} />
        )
      }
    />
  );
};

export default ProtectRoute;
