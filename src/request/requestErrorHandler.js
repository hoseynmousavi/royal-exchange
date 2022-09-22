import toastManager from "../helpers/toastManager"
import errorConstant from "../constant/errorConstant"
import {FAIL_TOAST} from "../constant/toastTypes"
import toastConstant from "../constant/toastConstant"
import logoutManager from "../helpers/logoutManager"

function requestErrorHandler({useRefreshToken, dontToast, err, callback})
{
    console.log(" %cERROR ", "color: orange; font-size:12px; font-family: 'Helvetica',consolas,sans-serif; font-weight:900;", err.response)
    if (!useRefreshToken && err?.response?.status === 401)
    {
        setTimeout(() => toastManager.addToast({message: toastConstant.tokenExpired, type: FAIL_TOAST}), 200)
        logoutManager.logout()
        throw err
    }
    else
    {
        if (!dontToast && err?.response?.status !== 404 && err?.message !== toastConstant.requestCancel) toastManager.addToast({message: errorConstant(err), type: FAIL_TOAST})
        throw err
    }
}

export default requestErrorHandler