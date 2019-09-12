import React, { Component } from "react";
import { NavBar, List, WhiteSpace, InputItem, Icon } from "antd-mobile";
import { connect } from "react-redux";

import { sendMsg } from "../../../redux/actions";
import "./chat.less";

const Item = List.Item;
class Chat extends Component {
  state = {
    content: ""
  };
  backHandle = () => {
    this.props.history.go(-1);
  };
  inputHandle = val => {
    this.setState({ content: val });
  };
  sendMsgHandle = data => {
    this.props.sendMsg(data);
    this.setState({
      content: ""
    });
  };
  componentDidMount() {
    window.scrollTo(0, document.body.scrollHeight);
  }
  componentDidUpdate() {
    window.scrollTo(0, document.body.scrollHeight);
  }
  render() {
    const { chatMsgs, users } = this.props.chat;

    const targetId = this.props.match.params.userid;
    const userid = this.props.user._id;
    if (!users[userid]) {
      return null;
    }
    const content = this.state.content;
    const chatId = [targetId, userid].sort().join("_");
    const msgList = chatMsgs.filter(item => item.chat_id === chatId);
    console.log("users", users, "chatMsgs", chatMsgs, "targetId", targetId);
    const sendLabel = (
      <span>
        <img
          style={{ marginRight: 5 }}
          src={require("../../../assets/images/头像1.png")}
          alt=""
        />
        <span
          onClick={() =>
            this.sendMsgHandle({ from: userid, to: targetId, content: content })
          }
        >
          发送
        </span>
      </span>
    );
    return (
      <div id="chat-page">
        <NavBar
          className="my-navbar"
          icon={<Icon type="left" onClick={() => this.backHandle()} />}
        >
          {users[targetId] ? users[targetId].username : null}
        </NavBar>
        <WhiteSpace></WhiteSpace>
        <List style={{ paddingTop: 30, paddingBottom: 40 }}>
          {msgList.map((item, index) => {
            if (item.to === userid) {
              return (
                <Item key={item._id}>
                  <img
                    src={require(`../../../assets/images/${"头像1"}.png`)}
                    style={{ marginRight: 10 }}
                    alt=""
                  />
                  {item.content}
                </Item>
              );
            } else {
              return (
                <Item
                  key={item._id}
                  className="my-item"
                  style={{ textAlign: "right" }}
                >
                  {item.content}
                  <span
                    style={{
                      fontSize: 12,
                      color: "black",
                      fontWeight: "600",
                      marginLeft: 6
                    }}
                  >
                    自己
                  </span>
                </Item>
              );
            }
          })}
        </List>
        <div style={{ position: "fixed", bottom: 0, width: "100%" }}>
          <InputItem
            placeholder="请输入内容"
            extra={sendLabel}
            onChange={val => this.inputHandle(val)}
          ></InputItem>
        </div>
      </div>
    );
  }
}

export default connect(
  state => ({ chat: state.chat, user: state.user }),
  { sendMsg }
)(Chat);
