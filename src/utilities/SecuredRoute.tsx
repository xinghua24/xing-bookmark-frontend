import React from "react";
import { useSelector } from "react-redux";
import { Route } from "react-router-dom";
import { Redirect } from "react-router-dom";

const SecuredRoute: React.FC<any> = ({
  component: Component,
  path,
  ...rest
}: any) => {
  const username = useSelector((state: any) => state.user.username);
  return (
    <Route
      path={path}
      {...rest}
      render={(routeProps: any) => {
        if (username) {
          return <Component {...routeProps} />;
        } else {
          return <Redirect to={{ pathname: "/" }}></Redirect>;
        }
      }}
    />
  );
};

export default SecuredRoute;
