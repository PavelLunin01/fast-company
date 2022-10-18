import React from "react";
import { Route, Switch } from "react-router-dom";
import Users from "./components/users";
import NavBar from "./components/navBar";
import Login from "./components/login";
import Main from "./components/main";

const App = () => {
  return (
    <>
      <NavBar/>
      <Switch>
        <Route path="/users/:userId?" render={(props) => <Users {...props}/>}/>
        <Route path="/login" component={Login}/>
        <Route path="/" exact component={Main}/>
      </Switch>
    </>
  );
};
export default App;
