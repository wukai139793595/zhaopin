import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import { register } from "../../redux/actions.jsx";
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

import BigLogo from "../../components/bigLogo/bigLogo.jsx";
import "./register.less";

const ListItem = List.Item;
class Rigister extends Component {
  state = {
    username: "",
    password: "",
    password2: "",
    usertype: "biggod"
  };
  inputChange = (name, val) => {
    console.log(val);
    this.setState({
      [name]: val
    });
  };
  registerHandle = () => {
    const { username, password, password2, usertype } = this.state;
    this.props.register({ username, password, password2, usertype });
    // console.log(
    //   this.state.username,
    //   this.state.password,
    //   this.state.password2,
    //   this.state.usertype
    // );
  };
  render() {
    const { usertype } = this.state;
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
          注册
        </NavBar>
        <BigLogo></BigLogo>
        <WingBlank>
          <List>
            {msg ? (
              <div style={{ textAlign: "center", color: "red" }}>{msg}</div>
            ) : null}
            <InputItem
              placeholder="请输入用户名"
              onChange={val => this.inputChange("username", val)}
            >
              用户名:
            </InputItem>
            <WhiteSpace></WhiteSpace>
            <InputItem
              placeholder="请输入密码"
              onChange={val => this.inputChange("password", val)}
            >
              密&nbsp;&nbsp;&nbsp;码:
            </InputItem>
            <WhiteSpace></WhiteSpace>
            <InputItem
              placeholder="请确认密码"
              onChange={val => this.inputChange("password2", val)}
            >
              确认密码
            </InputItem>
            <WhiteSpace></WhiteSpace>
            <ListItem>
              <span>用户类型</span>
              <Radio
                className="big-god"
                key="biggod"
                onChange={val => this.inputChange("usertype", "biggod")}
                checked={usertype === "biggod"}
              >
                大神
              </Radio>
              <Radio
                className="boss"
                key="boss"
                onChange={val => this.inputChange("usertype", "boss")}
                checked={usertype === "boss"}
              >
                老板
              </Radio>
            </ListItem>
            <WhiteSpace></WhiteSpace>
            <Button
              type="primary"
              size="large"
              onClick={() => {
                this.registerHandle();
              }}
            >
              注册
            </Button>
            <WhiteSpace></WhiteSpace>
            <Button
              type="default"
              size="large"
              onClick={() => {
                this.props.history.replace("/login");
              }}
            >
              已有账户
            </Button>
          </List>
        </WingBlank>
      </div>
    );
  }
}

export default connect(
  state => ({ user: state.user }),
  { register }
)(Rigister);
