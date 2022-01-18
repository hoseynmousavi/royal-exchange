import request from "../../request/request"
import apiUrlsConstant from "../../constant/apiUrlsConstant"
import {PIN_PRICE, SET_CONTACT, SET_PRICES, SET_RESERVE_TYPE, SET_TIME, UNPIN_PRICE} from "./MainTypes"

const getTime = ({dispatch}) =>
{
    request.get({url: apiUrlsConstant.getTime})
        .then(res =>
        {
            dispatch({
                type: SET_TIME,
                payload: {res},
            })
        })
}

const getPrices = ({dispatch}) =>
{
    request.get({url: apiUrlsConstant.getPrices})
        .then(res =>
        {
            dispatch({
                type: SET_PRICES,
                payload: {res},
            })
        })
}

const pinPrice = ({productId, selectedTab, dispatch}) =>
{
    return request.get({url: apiUrlsConstant.pinPrice, param: `?productId=${productId}`, dontCache: true})
        .then(() =>
        {
            dispatch({
                type: PIN_PRICE,
                payload: {productId, selectedTab},
            })
        })
}

const unPinPrice = ({productId, selectedTab, dispatch}) =>
{
    return request.get({url: apiUrlsConstant.unPinPrice, param: `?productId=${productId}`, dontCache: true})
        .then(() =>
        {
            dispatch({
                type: UNPIN_PRICE,
                payload: {productId, selectedTab},
            })
        })
}

const getContact = ({dispatch}) =>
{
    request.get({url: apiUrlsConstant.getContact})
        .then(res =>
        {
            dispatch({
                type: SET_CONTACT,
                payload: {res},
            })
        })
}

const getProductReserveTypes = ({dispatch}) =>
{
    request.get({url: apiUrlsConstant.getProductReserveTypes})
        .then(res =>
        {
            dispatch({
                type: SET_RESERVE_TYPE,
                payload: {res},
            })
        })
}

const getReserveTime = ({IsBuy, ProductId, Quantity}) =>
{
    return request.get({url: apiUrlsConstant.getReserveTime, param: `?IsBuy=${IsBuy}&ProductId=${ProductId}&Quantity=${Quantity}`})
}

const setReserve = (data) =>
{
    return request.post({url: apiUrlsConstant.setReserve, data})
}


const MainActions = {
    getTime,
    getPrices,
    pinPrice,
    unPinPrice,
    getContact,
    getProductReserveTypes,
    getReserveTime,
    setReserve,
}

export default MainActions