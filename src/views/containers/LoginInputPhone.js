import PhoneInput from "../components/PhoneInput"
import {useState} from "react"
import urlConstant from "../../constant/urlConstant"
import OnKeyDown from "../../helpers/OnKeyDown"
import Button from "../components/Button"
import textConstant from "../../constant/textConstant"
import RadioItem from "../components/RadioItem"
import LoginHeader from "../components/LoginHeader"
import parseQueryString from "../../helpers/parseQueryString"

function LoginInputPhone()
{
    const [phone, setPhone] = useState(null)
    const [acceptRules, setAcceptRules] = useState(false)
    const disable = !phone || !acceptRules

    OnKeyDown({key: "Enter", callback: goToCode})

    function onPhoneChange(phone)
    {
        setPhone(phone)
    }

    function goToCode()
    {
        if (!disable)
        {
            const {returnTo} = parseQueryString()
            window.history.pushState("", "", `${urlConstant.loginVerifyCode(phone)}${returnTo ? `?returnTo=${returnTo}` : ""}`)
        }
    }

    function toggleRules()
    {
        setAcceptRules(state => !state)
    }

    return (
        <div className="login">
            <LoginHeader/>
            <div className="login-main">
                <h1 className="login-title">{textConstant.entering}</h1>
                <p className="login-desc">{textConstant.enterPhone}</p>
                <PhoneInput onChange={onPhoneChange}/>
            </div>
            <div className="login-submit">
                <Button type="first" disable={disable} onClick={goToCode}>{textConstant.continueBtn}</Button>
            </div>
            <div className="login-footer">
                <RadioItem className="login-footer-cont" isRtl name={textConstant.acceptRules} onClick={toggleRules} isActive={acceptRules}/>
            </div>
        </div>
    )
}

export default LoginInputPhone