import server from './request.js';

function ajax(url, data = {}, type = 'GET') {
    return new Promise((resolve, reject) => {
        if (type.toUpperCase().trim() === 'POST') {
            server({
                method: 'POST',
                url: url,
                data: data
            }).then((res) => {
                resolve(res)
            }, (err) => {
                reject(err)
            })
        } else if (type.toUpperCase().trim() === 'GET') {
            server({
                method: 'GET',
                url: url,
                params: data
            }).then((res) => {
                resolve(res)
            }, (err) => {
                reject(err)
            })
        }
    })
}

// 注册
export const reqRegister = (data) => ajax('/register', data, 'POST');
// 登录
export const reqLogin = (data) => ajax('/login', data, 'POST');
// 获取用户信息
export const reqGetUser = () => ajax('/getuser');
// 更新用户信息
export const reqUpdate = (data) => ajax('/update', data, 'POST');
// 获取用户列表
export const reqUserList = (data) => ajax('/userlist', data, 'POST');
// 
export const reqChatMsgList = (data) => ajax('/msglist', data);
// 更新已读消息
export const reqReadMsg = (data) => ajax('/readmsg', data);