import {
  AUTH_SUCCESS,
  ERROR_MSG,
  RECEIVE_USER,
  RESET_USER,
  RECEIVE_USER_LIST,
  ERROR_USER_LIST,
  RECEIVE_MSG,
  RECEIVE_MSG_LIST,
  READ_MSG
} from "./action-types";
import {
  reqRegister,
  reqLogin,
  reqGetUser,
  reqUpdate,
  reqUserList,
  reqChatMsgList,
  reqReadMsg
} from "../api/ajax";

const io = require("socket.io-client");
function initIO(dispatch, userid) {
  if (!io.socket) {
    io.socket = io("ws://localhost:5000");
    io.socket.on("serverMsg", function(chatMsg) {
      if (chatMsg.from === userid || chatMsg.to === userid) {
        dispatch(receiveMsg(chatMsg, userid));

        console.log("接收服务器消息", chatMsg);
      }
    });
  }
}

const receiveMsgList = data => ({ type: RECEIVE_MSG_LIST, data });
const receiveMsg = (chatMsg, userid) => ({
  type: RECEIVE_MSG,
  data: { chatMsg, userid }
});
const receiveReadMsg = data => ({ type: READ_MSG, data });
export const readMsg = function(data) {
  const { from, to } = data;

  return async dispatch => {
    let result = await reqReadMsg(data);
    console.log("result", result, "from", from, "to", to);
    if (result.code === 0) {
      dispatch(receiveReadMsg({ from: from, to: to, number: result.data }));
    }
  };
};
export const sendMsg = data => {
  return dispatch => {
    console.log(data);
    io.socket.emit("clientMsg", data);
  };
};

async function getMsgList(dispatch, userid) {
  initIO(dispatch, userid);
  const result = await reqChatMsgList();
  if (result.code === 0) {
    const { users, chatMsgs } = result.data;
    dispatch(receiveMsgList({ users, chatMsgs, userid }));
  }
}

const authSuccess = data => ({ type: AUTH_SUCCESS, data: data });
const errorMsg = data => ({ type: ERROR_MSG, data: data });
const receiveUser = data => ({ type: RECEIVE_USER, data: data });
export const resetUser = () => ({ type: RESET_USER, data: {} });
const receiveUserList = userList => ({
  type: RECEIVE_USER_LIST,
  data: userList
});
const errorUserList = msg => ({ type: ERROR_USER_LIST, data: msg });

export const register = function(user) {
  const { username, password, password2, usertype } = user;
  return async dispatch => {
    let result = await reqRegister({ username, password, password2, usertype });
    if (!username) {
      dispatch(errorMsg("请输入用户名"));
      return;
    } else if (!password) {
      dispatch(errorMsg("请输入密码"));
      return;
    } else if (!password2) {
      dispatch(errorMsg("请输入确认密码"));
      return;
    } else if (!usertype) {
      dispatch(errorMsg("请选择用户类型"));
      return;
    } else if (password.trim() !== password2.trim()) {
      dispatch(errorMsg("两次密码不一致"));
      return;
    }
    console.log("result", result);
    if (result.code == 0) {
      dispatch(authSuccess(result.data));
      getMsgList(dispatch, result.data._id);
    } else {
      dispatch(errorMsg(result.msg));
    }
  };
};

export const login = user => {
  const { username, password } = user;
  return async dispatch => {
    if (!username) {
      dispatch(errorMsg("请输入用户名"));
      return;
    } else if (!password) {
      dispatch(errorMsg("请输入密码"));
      return;
    }
    let result = await reqLogin({ username, password });
    console.log("login", result.data);
    if (result.code === 0) {
      getMsgList(dispatch, result.data._id);
      dispatch(receiveUser(result.data));
    } else {
      dispatch(errorMsg(result.msg));
    }
  };
};

export const getUser = function() {
  return async dispatch => {
    let result = await reqGetUser();
    console.log("getUser", result);
    if (result.code === 0) {
      getMsgList(dispatch, result.data._id);
      dispatch(receiveUser(result.data));
    } else {
      dispatch(resetUser());
    }
  };
};

export const update = function(user) {
  return async dispatch => {
    let result = await reqUpdate(user);

    if (result.code === 0) {
      dispatch(receiveUser(result.data));
    } else {
      dispatch(errorMsg(result.msg));
    }
  };
};

export const getUserList = function(usertype) {
  return async dispatch => {
    let result = await reqUserList(usertype);
    if (result.code === 0) {
      dispatch(receiveUserList(result.data));
    } else {
      dispatch(errorUserList(result.msg));
    }
  };
};
