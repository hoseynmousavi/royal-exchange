import LogoText from "./LogoText"
import PhoneSvg from "../../media/svg/PhoneSvg"

function LoginHeader()
{
    return (
        <div className="login-header">
            <LogoText className="login-logo"/>
            <PhoneSvg className="login-phone"/>
        </div>
    )
}

export default LoginHeader