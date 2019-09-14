import { combineReducers } from "redux";
import {
  AUTH_SUCCESS,
  ERROR_MSG,
  RECEIVE_USER,
  RESET_USER,
  RECEIVE_USER_LIST,
  ERROR_USER_LIST,
  RECEIVE_MSG_LIST,
  RECEIVE_MSG,
  READ_MSG
} from "./action-types.jsx";
import { getDirectTo } from "../utils/index.jsx";

const initUser = {
  username: "", // 用户名
  usertype: "", // 用户类型 dashen/laoban
  msg: "", // 错误提示信息
  redirectTo: "" // 需要自动重定向的路由路径
};
function user(state = initUser, action) {
  switch (action.type) {
    case AUTH_SUCCESS:
      return { ...action.data, redirectTo: getDirectTo(action.data) };
    case RECEIVE_USER:
      return { ...action.data, redirectTo: getDirectTo(action.data) };
    case RESET_USER:
      return { ...initUser };
    case ERROR_MSG:
      return { msg: action.data };
    default:
      return state;
  }
}
function userList(state = [], action) {
  switch (action.type) {
    case RECEIVE_USER_LIST:
      return [...action.data];
    case ERROR_USER_LIST:
      return { msg: action.data };
    default:
      return state;
  }
}
const initChat = {
  users: {}, // 所有用户信息的对象  属性名: userid, 属性值是: {username, header}
  chatMsgs: [], // 当前用户所有相关msg的数组
  unReadCount: 0 // 总的未读数量
};
function getReadCount(chatMsgs, to) {
  let unReadCount = 0;

  chatMsgs.forEach((item, index) => {
    if (item.to === to && !item.read) {
      unReadCount++;
    }
  });
  return unReadCount;
}
function chat(state = initChat, action) {
  switch (action.type) {
    case RECEIVE_MSG_LIST:
      const { users, chatMsgs, userid } = action.data;
      return {
        users,
        chatMsgs,
        unReadCount: getReadCount(chatMsgs, userid)
      };
    case RECEIVE_MSG:
      const { chatMsg } = action.data;
      return {
        users: state.users,
        chatMsgs: [...state.chatMsgs, chatMsg],
        unReadCount: getReadCount(
          [...state.chatMsgs, chatMsg],
          action.data.userid
        )
      };
    case READ_MSG:
      const { from, to, number } = action.data;
      console.log("number", number);
      return {
        users: state.users,
        chatMsgs: state.chatMsgs.map((item, index) => {
          if (item.from === from && item.to === to && !item.read) {
            return { ...item, read: true };
          } else {
            return { ...item };
          }
        }),
        unReadCount: state.unReadCount - number
      };
    default:
      return state;
  }
}
export default combineReducers({
  user,
  userList,
  chat
});
