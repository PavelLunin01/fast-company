import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Users from "./layouts/users";
import NavBar from "./components/ui/navBar";
import Login from "./layouts/login";
import Main from "./layouts/main";
import { ToastContainer } from "react-toastify";
import AuthProvider from "./hooks/useAuth";
import ProtectedRoute from "./components/ui/protectedRoute";
import LogOut from "./layouts/logOut";
import AppLoader from "./components/ui/hoc/appLoader";

const App = () => {
  return (
    <>
      <AppLoader>
        <AuthProvider>
          <NavBar />
          <Switch>
            <ProtectedRoute path="/users/:userId?/:edit?" component={Users} />
            <Route path="/login/:form?" component={Login} />
            <Route path="/logout" component={LogOut} />
            <Route path="/" exact component={Main} />
            <Redirect to="/" />
          </Switch>
        </AuthProvider>
        <ToastContainer/>
      </AppLoader>
    </>
  );
};
export default App;
