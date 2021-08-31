import { lazy, Suspense } from "react";
import { Switch, Route } from "react-router-dom";

import { PATHS } from "common/paths";

import LoadingFallback from "./components/LoadingFallback";
import ErrorBoundary from "components/ErrorBoundary";

import Home from "pages/Home";

const Login = lazy(() => import("pages/Login"));
const Logout = lazy(() => import("pages/Logout"));

const Account = lazy(() => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject();
    }, 3000);
  });
});

const Router = () => {
  return (
    <ErrorBoundary>
      <Suspense fallback={<LoadingFallback />}>
        <Switch>
          <Route path={PATHS.HOME} exact component={Home} />
          <Route path={PATHS.LOGIN} exact component={Login} />
          <Route path={PATHS.LOGOUT} exact component={Logout} />
          <Route path={PATHS.ACCOUNT} exact component={Account} />
        </Switch>
      </Suspense>
    </ErrorBoundary>
  );
};

export default Router;
