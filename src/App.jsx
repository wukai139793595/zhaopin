import React from "react";
import { Route, Switch } from "react-router-dom";

import logo from "./logo.svg";
import { Button } from "antd-mobile";
import { NavBar, Icon } from "antd-mobile";
import Rigister from "./pages/register/register.jsx";
import Login from "./pages/login/login.jsx";
import Main from "./pages/main/main.jsx";

import "./assets/css/index.less";

function App() {
  return (
    <Switch>
      <Route path="/register" component={Rigister}></Route>
      <Route path="/login" component={Login}></Route>
      <Route component={Main}></Route>
    </Switch>
  );
}

export default App;
