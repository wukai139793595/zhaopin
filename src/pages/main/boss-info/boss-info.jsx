import React, { Component } from "react";
import {
  NavBar,
  List,
  Grid,
  InputItem,
  WhiteSpace,
  Button,
  Toast
} from "antd-mobile";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import { update } from "../../../redux/actions.jsx";

class BossInfo extends Component {
  state = {
    header: "",
    post: "",
    company: "",
    salary: "",
    info: ""
  };
  inputHandle = (name, val) => {
    this.setState({
      [name]: val
    });
  };
  buttonClick = () => {
    const { header, post, company, salary, info } = this.state;

    if (!header || !post || !company || !salary || !info) {
      Toast.info("请填写完整信息");
    } else {
      this.props.update({ user: { header, post, company, salary, info } });
    }
  };
  gridClick = val => {
    this.setState({
      header: val.text
    });
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
    const { header } = this.props.user;
    const { redirectTo } = this.props.user;
    if (header) {
      console.log("header", header);
      return <Redirect to={redirectTo}></Redirect>;
    }
    const stateHeader = this.state.header;
    const listHeader = !stateHeader ? (
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
          src={require(`../../../assets/images/${stateHeader}.png`)}
          alt=""
        />
      </span>
    );

    return (
      <div>
        <NavBar>老板信息完善</NavBar>
        <List renderHeader={listHeader}>
          <Grid
            columnNum={5}
            data={this.imgList}
            onClick={val => this.gridClick(val)}
          ></Grid>

          <InputItem
            placeholder="请输入招聘职位"
            onChange={val => this.inputHandle("post", val)}
          >
            招聘职位：
          </InputItem>

          <InputItem
            placeholder="请输入公司名称"
            onChange={val => this.inputHandle("company", val)}
          >
            公司名称：
          </InputItem>

          <InputItem
            placeholder="请输入职位薪资"
            onChange={val => this.inputHandle("salary", val)}
          >
            职位薪资：
          </InputItem>
          <InputItem
            placeholder="请输入职位要求"
            onChange={val => this.inputHandle("info", val)}
          >
            职位要求：
          </InputItem>
          <WhiteSpace></WhiteSpace>
          <Button type="primary" onClick={() => this.buttonClick()}>
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
)(BossInfo);
