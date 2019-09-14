import React, { Component } from "react";
import { connect } from "react-redux";

import { getUserList } from "../../../redux/actions.jsx";
import UserList from "../../../components/user-list/user-list";

class BigGod extends Component {
  state = {};
  componentDidMount() {
    this.props.getUserList({ usertype: "boss" });
  }
  render() {
    const userList = this.props.userList;
    return <UserList userList={userList}></UserList>;
  }
}

export default connect(
  state => ({ userList: state.userList }),
  { getUserList }
)(BigGod);
