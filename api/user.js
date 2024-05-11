import request from '../utils/requests.js'

// 登录接口
export const userLoginService =({ phone, password}) =>
    request.post('/login', { phone, password})