import React, { Component } from "react";
import { WhiteSpace, WingBlank, List, Card } from "antd-mobile";
import { withRouter } from "react-router-dom";

class UserList extends Component {
  cardHandle = item => {
    this.props.history.push("/chat/" + item._id);
  };
  render() {
    const userList = this.props.userList;
    // console.log("userList", userList);
    return (
      <WingBlank>
        {userList.map((item, index) => {
          return (
            <Card
              full
              style={{ marginTop: 12, marginBottom: 12 }}
              key={item._id}
              onClick={() => this.cardHandle(item)}
            >
              <Card.Header
                thumb={require(`../../assets/images/${item.header}.png`)}
                extra={<span>{item.username}</span>}
              />
              <Card.Body>
                <div>
                  <span>职位：</span>
                  <span>{item.post}</span>
                </div>
                <div>
                  <span>描述：</span>
                  <span>{item.info}</span>
                </div>
              </Card.Body>
            </Card>
          );
        })}
      </WingBlank>
    );
  }
}
export default withRouter(UserList);
