import {useContext, useEffect, useRef, useState} from "react"
import CodeInput from "../components/CodeInput"
import Button from "../components/Button"
import AuthActions from "../../context/auth/AuthActions"
import {AuthContext} from "../../context/auth/AuthReducer"
import toastConstant from "../../constant/toastConstant"
import textConstant from "../../constant/textConstant"
import LoginHeader from "../components/LoginHeader"
import urlConstant from "../../constant/urlConstant"

function LoginInputCode({route: {match: {params: {phone}}}})
{
    const {dispatch} = useContext(AuthContext)
    const [showError, setShowError] = useState(false)
    const [verifyLoading, setVerifyLoading] = useState(false)
    const [code, setCode] = useState("")
    const errorTimer = useRef(null)
    const request = useRef(null)

    useEffect(() =>
    {
        if (!phone) window.history.replaceState("", "", urlConstant.login)
        else AuthActions.sendOtp({username: phone, cancel: cancelSource => request.current = cancelSource})

        return () => request?.current?.cancel && request.current.cancel(toastConstant.requestCancel)
        // eslint-disable-next-line
    }, [])

    function onCodeChange(code, resetInput)
    {
        setCode(code)
        if (code)
        {
            setVerifyLoading(true)
            AuthActions.loginOrSignup({username: phone, code, dispatch})
                .then(() => window.history.replaceState("", "", urlConstant.home))
                .catch(() =>
                {
                    setVerifyLoading(false)
                    resetInput()
                    setShowError(true)
                    clearTimeout(errorTimer.current)
                    errorTimer.current = setTimeout(() => setShowError(false), 2500)
                })
        }
    }

    return (
        <div className="login">
            <LoginHeader/>
            <div className="login-main">
                <h1 className="login-title">{textConstant.enteringCodeTitle}</h1>
                <p className="login-desc">{textConstant.enteringCode}</p>
                <CodeInput error={!!showError} disable={verifyLoading} onChange={onCodeChange}/>
            </div>
            <div className="login-submit">
                <Button type="first" disable={!code} loading={verifyLoading}>{textConstant.login}</Button>
            </div>
            <div className="login-footer"/>
        </div>
    )
}

export default LoginInputCode