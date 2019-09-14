import React, { Component } from "react";
import { TabBar } from "antd-mobile";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import "./nav-footer.less";

const { Item } = TabBar;

class NavFooter extends Component {
  state = {};
  render() {
    let tabList = this.props.tabList.filter((item, index) => {
      return !item.hide;
    });
    const { unReadCount } = this.props.chat;
    return (
      <TabBar tabBarPosition="bottom">
        {tabList.map((item, index) => {
          return (
            <Item
              icon={{ uri: require(`../../assets/nav${item.key}.png`) }}
              selectedIcon={{
                uri: require(`../../assets/nav${item.key}-selected.png`)
              }}
              badge={item.key === "/message" ? unReadCount : 0}
              title={item.title}
              selected={this.props.history.location.pathname === item.key}
              key={item.key}
              onPress={() => this.props.history.replace(item.key)}
            ></Item>
          );
        })}
      </TabBar>
    );
  }
}

export default connect(state => ({ chat: state.chat }))(withRouter(NavFooter));
