import React, { useEffect } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Users from "./layouts/users";
import NavBar from "./components/ui/navBar";
import Login from "./layouts/login";
import Main from "./layouts/main";
import { ToastContainer } from "react-toastify";
import AuthProvider from "./hooks/useAuth";
import ProtectedRoute from "./components/ui/protectedRoute";
import LogOut from "./layouts/logOut";
import { loadQualitiesList } from "./store/qualities";
import { useDispatch } from "react-redux";
import { loadProfessionsList } from "./store/professions";
import { loadUsersList } from "./store/users";

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadQualitiesList());
    dispatch(loadProfessionsList());
    dispatch(loadUsersList());
  }, []);

  return (
    <>
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
    </>
  );
};
export default App;
