import React, { Component } from "react";
import {
  NavBar,
  Icon,
  WhiteSpace,
  WingBlank,
  List,
  InputItem,
  Radio,
  Button
} from "antd-mobile";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import { login } from "../../redux/actions.jsx";

import BigLogo from "../../components/bigLogo/bigLogo.jsx";
import "./login.less";
class Login extends Component {
  state = {
    username: "",
    password: ""
  };
  informChange = (name, val) => {
    this.setState({
      [name]: val
    });
  };
  loginHandle = () => {
    this.props.login(this.state);
  };
  render() {
    const { redirectTo, msg } = this.props.user;
    if (redirectTo) {
      return <Redirect to={redirectTo}></Redirect>;
    }
    return (
      <div>
        <NavBar
          mode="dark"
          leftContent="Back"
          rightContent={[
            <Icon key="0" type="search" style={{ marginRight: "16px" }} />,
            <Icon key="1" type="ellipsis" />
          ]}
        >
          登录
        </NavBar>
        <BigLogo></BigLogo>
        <WingBlank>
          <List>
            {msg ? (
              <div style={{ textAlign: "center", color: "red" }}>{msg}</div>
            ) : null}
            <InputItem
              placeholder="请输入用户名"
              onChange={val => this.informChange("username", val)}
            >
              用户名：
            </InputItem>
            <WhiteSpace></WhiteSpace>
            <InputItem
              placeholder="请输入密码"
              onChange={val => this.informChange("password", val)}
            >
              密码：
            </InputItem>
            <WhiteSpace></WhiteSpace>
            <Button type="primary" onClick={() => this.loginHandle()}>
              登录
            </Button>
            <WhiteSpace></WhiteSpace>
            <Button
              type="default"
              onClick={() => {
                this.props.history.replace("/register");
              }}
            >
              还没有账户
            </Button>
          </List>
        </WingBlank>
      </div>
    );
  }
}

export default connect(
  state => ({ user: state.user }),
  { login }
)(Login);
