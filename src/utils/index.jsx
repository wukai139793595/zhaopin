import Cookie from "js-cookie";

export const getDirectTo = function(user) {
  var userid = Cookie.get(userid);
  var path = "";

  if (!user.header) {
    if (user.usertype === "biggod") {
      path = "/biggodinfo";
    } else {
      path = "/bossinfo";
    }
  } else {
    if (user.usertype === "biggod") {
      path = "/biggod";
    } else {
      path = "/boss";
    }
  }

  return path;
};

export const filterLastMsgs = function(chatMsgs, userid) {
  let lastObj = {};
  chatMsgs.forEach((item, index) => {
    if (item.from === userid || item.to === userid) {
      if (!lastObj[item.chat_id]) {
        lastObj[item.chat_id] = { ...item };
        if (item.to === userid && !item.read) {
          lastObj[item.chat_id].unReadCount = 1;
        } else {
          lastObj[item.chat_id].unReadCount = 0;
        }
      } else {
        let tempCount = lastObj[item.chat_id].unReadCount;
        if (lastObj[item.chat_id].create_time < item.create_time) {
          if (item.to === userid && !item.read) {
            lastObj[item.chat_id] = { ...item, unReadCount: tempCount + 1 };
          } else {
            lastObj[item.chat_id] = { ...item, unReadCount: tempCount };
          }
        } else {
          if (item.to === userid && !item.read) {
            lastObj[item.chat_id].unReadCount += 1;
          }
        }
      }
    }
  });
  let lastMsgArr = Object.values(lastObj);
  lastMsgArr.sort((t1, t2) => {
    return t2.create_time - t1.create_time;
  });
  return lastMsgArr;
};
// export const filterMsgs = function(chatMsgs, userid) {
//   return chatMsgs.filter(function(item, index) {
//     if (item.to === userid || item.from === userid) {
//       return true;
//     }
//   });
// };
