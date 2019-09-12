import React, { Component } from "react";
import { connect } from "react-redux";
import { List, WhiteSpace } from "antd-mobile";
import { withRouter } from "react-router-dom";

import { filterLastMsgs } from "../../../utils/index";

const { Item } = List;
const { Brief } = Item;
class Message extends Component {
  state = {};
  render() {
    let lastMsgArr = filterLastMsgs(
      this.props.chat.chatMsgs,
      this.props.user._id
    );
    let users = this.props.chat.users;
    let userid = this.props.user._id;
    console.log("lastMsgArr", lastMsgArr);
    return (
      <div>
        {/* <NavBar className="my-navbar">消息列表</NavBar> */}
        <WhiteSpace></WhiteSpace>
        <List>
          {lastMsgArr.map((item, index) => {
            return (
              <Item
                key={item.chat_id}
                arrow="horizontal"
                thumb={require(`../../../assets/images/${users[item.from === userid ? item.to : item.from].header}.png`)}
                multipleLine
                onClick={() => {
                  this.props.history.push(
                    `/chat/${item.from === userid ? item.to : item.from}`
                  );
                }}
              >
                {item.content}{" "}
                <Brief>
                  {users[item.from === userid ? item.to : item.from].username}
                </Brief>
              </Item>
            );
          })}
        </List>
      </div>
    );
  }
}

export default connect(state => ({ chat: state.chat, user: state.user }))(
  withRouter(Message)
);
