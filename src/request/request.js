import axios from "axios"
import urlMaker from "./urlMaker"
import errorHandler from "./requestErrorHandler"
import requestDataShareManager from "./requestDataShareManager"

let onGoingReqs = {}

function handleRepeat({reqUrl})
{
    return new Promise((resolve, reject) =>
    {
        onGoingReqs[reqUrl].count++

        function onDataEvent(event)
        {
            window.removeEventListener("dataShare", onDataEvent)
            const {message: {status, dataReqUrl, data}} = event.detail
            if (reqUrl === dataReqUrl)
            {
                if (status === "OK") resolve(data)
                else reject(data)
            }
        }

        window.addEventListener("dataShare", onDataEvent, {passive: true})
    })
}

function get({url, param = "", dontToast, dontCache, cancel, useRefreshToken})
{
    const reqUrl = urlMaker({url, param})
    if (onGoingReqs[reqUrl]) return handleRepeat({reqUrl})
    else
    {
        onGoingReqs[reqUrl] = {count: 1}
        const token = useRefreshToken ?
            localStorage.getItem("refreshToken")
            :
            localStorage.getItem("token") ? `bearer ${localStorage.getItem("token")}` : null
        let source
        if (cancel)
        {
            const CancelToken = axios.CancelToken
            source = CancelToken.source()
            cancel(source)
        }
        return axios.get(
            reqUrl,
            {
                headers: token && {[useRefreshToken ? "refresh-token" : "Authorization"]: token},
                cancelToken: source?.token,
            },
        )
            .then(res =>
            {
                const output = res.data
                if (onGoingReqs[reqUrl].count > 1) requestDataShareManager.dataShare({message: {status: "OK", dataReqUrl: reqUrl, data: output}})
                delete onGoingReqs[reqUrl]
                if (!dontCache) localStorage.setItem(url + "/" + param, JSON.stringify(output))
                if (!output.status) throw {response: {data: output}}
                else return output
            })
            .catch(err =>
            {
                if (err.message === "Network Error" && !dontCache)
                {
                    const cacheData = localStorage.getItem(url + "/" + param)
                    if (cacheData)
                    {
                        const output = JSON.parse(cacheData)
                        if (onGoingReqs[reqUrl].count > 1) requestDataShareManager.dataShare({message: {status: "OK", dataReqUrl: reqUrl, data: output}})
                        delete onGoingReqs[reqUrl]
                        return output
                    }
                    else return errorHandler({dontToast, err, onGoingReqs, reqUrl, callback: () => get(arguments[0])})
                }
                else return errorHandler({dontToast, err, onGoingReqs, reqUrl, callback: () => get(arguments[0])})
            })
    }
}

function post({url, data, param, progress, cache, cancel, dontToast, useRefreshToken})
{
    const reqUrl = urlMaker({url, param})
    if (onGoingReqs[reqUrl]) return handleRepeat({reqUrl})
    else
    {
        onGoingReqs[reqUrl] = {count: 1}
        const token = useRefreshToken ?
            localStorage.getItem("refreshToken")
            :
            localStorage.getItem("token") ? `bearer ${localStorage.getItem("token")}` : null
        let source
        if (cancel)
        {
            const CancelToken = axios.CancelToken
            source = CancelToken.source()
            cancel(source)
        }
        return axios.post(
            reqUrl,
            data,
            {
                headers: token && {[useRefreshToken ? "refresh-token" : "Authorization"]: token},
                cancelToken: source?.token,
                onUploadProgress: e => progress && progress(e),
            },
        )
            .then(res =>
            {
                const output = res.data
                if (onGoingReqs[reqUrl].count > 1) requestDataShareManager.dataShare({message: {status: "OK", dataReqUrl: reqUrl, data: output}})
                delete onGoingReqs[reqUrl]
                if (cache) localStorage.setItem(url + "/" + param, JSON.stringify(output))
                if (!output.status) throw {response: {data: output}}
                else return output
            })
            .catch(err =>
            {
                if (err.message === "Network Error" && cache)
                {
                    const cacheData = localStorage.getItem(url + "/" + param)
                    if (cacheData)
                    {
                        const output = JSON.parse(cacheData)
                        if (onGoingReqs[reqUrl].count > 1) requestDataShareManager.dataShare({message: {status: "OK", dataReqUrl: reqUrl, data: output}})
                        delete onGoingReqs[reqUrl]
                        return output
                    }
                    else return errorHandler({dontToast, err, onGoingReqs, reqUrl, callback: () => post(arguments[0])})
                }
                else return errorHandler({dontToast, err, onGoingReqs, reqUrl, callback: () => post(arguments[0])})
            })
    }
}

function put({url, data, param, progress, dontToast})
{
    const token = localStorage.getItem("token") ? `bearer ${localStorage.getItem("token")}` : null
    return axios.put(
        urlMaker({url, param}),
        data,
        {
            headers: {"Authorization": token},
            onUploadProgress: e => progress && progress(e),
        },
    )
        .then(res =>
        {
            const output = res.data
            if (!output.status) throw {response: {data: output}}
            else return output
        })
        .catch(err => errorHandler({dontToast, err, callback: () => put(arguments[0])}))
}

function patch({url, data, param, progress, dontToast})
{
    const token = localStorage.getItem("token")
    return axios.patch(
        urlMaker({url, param}),
        data,
        {
            headers: {"Authorization": token},
            onUploadProgress: e => progress && progress(e),
        },
    )
        .then(res =>
        {
            const output = res.data
            if (!output.status) throw {response: {data: output}}
            else return output
        })
        .catch(err => errorHandler({dontToast, err, callback: () => patch(arguments[0])}))
}

function del({url, data, param, dontToast})
{
    const token = localStorage.getItem("token") ? `bearer ${localStorage.getItem("token")}` : null
    return axios.delete(
        urlMaker({url, param}),
        {
            headers: {"Authorization": token},
            data,
        },
    )
        .then(res =>
        {
            const output = res.data
            if (!output.status) throw {response: {data: output}}
            else return output
        })
        .catch(err => errorHandler({dontToast, err, callback: () => del(arguments[0])}))
}

const request = {
    get, post, put, patch, del,
}

export default request