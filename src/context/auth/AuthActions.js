import {SET_USER} from "./AuthTypes"
import request from "../../request/request"
import apiUrlsConstant from "../../constant/apiUrlsConstant"

const sendOtp = ({username, cancel}) =>
{
    return request.post({url: apiUrlsConstant.sendOtp, data: {username}, cancel})
}

const loginOrSignup = ({username, code, dispatch}) =>
{
    return request.post({url: apiUrlsConstant.login, data: {username, code}})
        .then(res =>
        {
            const {data: user} = res
            setUser({user, dispatch})
            getUser({dispatch})
        })
}

const getUser = ({dispatch}) =>
{
    request.get({url: apiUrlsConstant.getProfile, dontCache: true, dontToast: true})
        .then(res =>
        {
            const {data: user} = res
            setUser({user, dispatch})
        })
}

const getTokenWithRefreshToken = () =>
{
    return request.get({url: apiUrlsConstant.refreshToken, dontCache: true, dontToast: true, useRefreshToken: true})
        .then(res =>
        {
            const {refreshToken, accessToken: token} = res.data
            localStorage.setItem("token", token)
            localStorage.setItem("refreshToken", refreshToken)
            return true
        })
        .catch(() =>
        {
            return false
        })
}

const editProfile = ({data, dispatch}) =>
{
    return request.post({url: apiUrlsConstant.editProfile, data})
        .then(() =>
        {
            setUser({user: data, dispatch})
        })
}

const setUser = ({user, dispatch}) =>
{
    dispatch({
        type: SET_USER,
        payload: {user},
    })
}

const logout = () =>
{
    return request.get({url: apiUrlsConstant.logout, useRefreshToken: true, dontToast: true, dontCache: true})
}

const AuthActions = {
    sendOtp,
    loginOrSignup,
    getUser,
    editProfile,
    setUser,
    getTokenWithRefreshToken,
    logout,
}

export default AuthActions