import React, { Component } from "react";
import { connect } from "react-redux";
import { List, WhiteSpace, Badge } from "antd-mobile";
import { withRouter } from "react-router-dom";

import { filterLastMsgs } from "../../../utils/index";
import { readMsg } from "../../../redux/actions";

const { Item } = List;
const { Brief } = Item;
class Message extends Component {
  state = {};
  componentDidMount() {
    let to = this.props.user._id;
    let from = this.props.match.params.userid;
    // this.props.readMsg({ from, to });
  }
  render() {
    let lastMsgArr = filterLastMsgs(
      this.props.chat.chatMsgs,
      this.props.user._id
    );
    let users = this.props.chat.users;
    let userid = this.props.user._id;
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
                extra={<Badge text={item.unReadCount} />}
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

export default connect(
  state => ({ chat: state.chat, user: state.user }),
  { readMsg }
)(withRouter(Message));
