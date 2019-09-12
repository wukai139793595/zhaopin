import React, { Component } from "react";
import { Result, List, Button, WhiteSpace, Modal } from "antd-mobile";
import { connect } from "react-redux";
import Cookie from "js-cookie";

import { resetUser } from "../../../redux/actions";

const Item = List.Item;
const Brief = Item.Brief;
const alert = Modal.alert;
class Personal extends Component {
  buttonHandle = () => {
    return alert("退出", "确定退出登录吗", [
      { text: "取消", onPress: () => console.log("cancel") },
      {
        text: "确定",
        onPress: () => {
          Cookie.remove("userid");
          this.props.resetUser();
        }
      }
    ]);
  };
  render() {
    const { username, info, header, company, post, salary } = this.props.user;
    console.log("personal:user", this.props.user);
    return (
      <div>
        <Result
          img={
            <img src={require(`../../../assets/images/${header}.png`)}></img>
          }
          title={username}
          message={company}
        />
        <List renderHeader={() => "相关信息"}>
          <Item>
            <Brief>职位:{post}</Brief>
            <Brief>简介:{info}</Brief>
            <Brief>薪资:{salary}</Brief>
          </Item>
        </List>
        <WhiteSpace></WhiteSpace>
        <Button type="warning" onClick={() => this.buttonHandle()}>
          退出登录
        </Button>
      </div>
    );
  }
}

export default connect(
  state => ({ user: state.user }),
  { resetUser }
)(Personal);
