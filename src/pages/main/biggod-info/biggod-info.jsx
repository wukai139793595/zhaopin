import React, { Component } from "react";
import { NavBar, List, Grid, InputItem, WhiteSpace, Button } from "antd-mobile";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import { update } from "../../../redux/actions.jsx";
import { getDirectTo } from "../../../utils/index";

class BigGodInfo extends Component {
  state = {
    post: "",
    info: "",
    header: ""
  };
  inputHandle = (name, val) => {
    this.setState({
      [name]: val
    });
  };
  gridClick = val => {
    this.setState({
      header: val.text
    });
  };
  buttonHandle = () => {
    const { post, info, header } = this.state;
    this.props.update({ user: { post, info, header } });
  };
  componentWillMount() {
    let imgList = Array.from(new Array(20)).map(function(item, index) {
      return {
        icon: require(`../../../assets/images/头像${index + 1}.png`),
        text: `头像${index + 1}`
      };
    });
    this.imgList = imgList;
  }
  render() {
    const { header, redirectTo } = this.props.user;
    if (header) {
      return <Redirect to={redirectTo}></Redirect>;
    }
    const headline = this.state.header;
    const listHeader = !headline ? (
      "请选择头像"
    ) : (
      <span>
        请选择头像
        <img
          style={{
            verticalAlign: "middle",
            width: 34,
            height: 34,
            marginLeft: 10
          }}
          src={require(`../../../assets/images/${headline}.png`)}
          alt=""
        />
      </span>
    );

    return (
      <div>
        <NavBar>大神信息完善</NavBar>
        <List renderHeader={listHeader}>
          <Grid
            columnNum={5}
            data={this.imgList}
            onClick={val => this.gridClick(val)}
          ></Grid>

          <InputItem
            placeholder="请输入求职岗位"
            onChange={val => this.inputHandle("post", val)}
          >
            求职岗位：
          </InputItem>

          <InputItem
            placeholder="请输入个人介绍"
            onChange={val => this.inputHandle("info", val)}
          >
            个人介绍：
          </InputItem>
          <WhiteSpace></WhiteSpace>
          <Button type="primary" onClick={() => this.buttonHandle()}>
            保存
          </Button>
        </List>
      </div>
    );
  }
}

export default connect(
  state => ({ user: state.user }),
  { update }
)(BigGodInfo);
