import Axios from 'axios'
const server = Axios.create({
    timeout: 5e3
})
server.defaults.withCredentials = true;
server.interceptors.request.use((config) => {

    return config
}, (err) => {
    console.log('request:error')
})
server.interceptors.response.use((response) => {
    return response.data
}, (err) => {
    console.log('response:error', err)
})

export default server;