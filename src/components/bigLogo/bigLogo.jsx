import React, { Component } from "react";

import "./bigLogo.less";
import logo from "../../assets/images/logo.png";
class BigLogo extends Component {
  state = {};
  render() {
    return (
      <div className="big-logo">
        <img src={logo} alt="" />
      </div>
    );
  }
}

export default BigLogo;
