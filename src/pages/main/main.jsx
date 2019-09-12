import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import Cookie from "js-cookie";
import { TabBar, NavBar } from "antd-mobile";

import BigGod from "./biggod/biggod.jsx";
import BigGodInfo from "./biggod-info/biggod-info.jsx";
import Boss from "./boss/boss.jsx";
import BossInfo from "./boss-info/boss-info.jsx";
import Message from "./message/message.jsx";
import Personal from "./personal/personal.jsx";
import NavFooter from "../../components/nav-footer/nav-footer.jsx";
import Chat from "./chat/chat.jsx";
import { getDirectTo } from "../../utils/index.jsx";
import { login, getUser, getUserList } from "../../redux/actions.jsx";
const tabList = [
  {
    text: "老板列表",
    title: "大神",
    key: "/biggod",
    hide: false
  },
  {
    text: "大神列表",
    title: "老板",
    key: "/boss",
    hide: false
  },
  {
    text: "消息列表",
    title: "消息",
    key: "/message",
    hide: false
  },
  {
    text: "个人中心",
    title: "个人",
    key: "/personal",
    hide: false
  }
];
const { Item } = TabBar;

class Main extends Component {
  state = {};
  componentWillMount() {
    const userid = Cookie.get("userid");
    const user = this.props.user;
    if (userid && !user._id) {
      this.props.getUser();
    }
  }
  render() {
    const userid = Cookie.get("userid");
    const user = this.props.user;

    // 没有登录过跳转到登录界面
    if (!userid) {
      return <Redirect to="/login"></Redirect>;
    }
    if (!user._id) {
      return null;
    } else if (this.props.location.pathname === "/") {
      const path = getDirectTo(user);
      return <Redirect to={path}></Redirect>;
    }
    //
    let path = this.props.location.pathname;
    let currentItem = tabList.find((item, index) => {
      return item.key === path;
    });
    if (this.props.user.usertype === "biggod") {
      tabList[1].hide = true;
    } else if (this.props.user.usertype === "boss") {
      tabList[0].hide = true;
    }
    return (
      <div>
        {currentItem ? <NavBar>{currentItem.text}</NavBar> : null}

        <Switch>
          <Route path="/biggod" component={BigGod}></Route>
          <Route path="/biggodinfo" component={BigGodInfo}></Route>
          <Route path="/boss" component={Boss}></Route>
          <Route path="/bossinfo" component={BossInfo}></Route>
          <Route path="/message" component={Message} />
          <Route path="/personal" component={Personal} />
          <Route path="/chat/:userid" component={Chat}></Route>
        </Switch>
        {currentItem ? <NavFooter tabList={tabList}></NavFooter> : null}
      </div>
    );
  }
}

export default connect(
  state => ({ user: state.user }),
  { getUser }
)(Main);
