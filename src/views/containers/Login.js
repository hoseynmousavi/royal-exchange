import Switch from "../components/Switch"
import urlConstant from "../../constant/urlConstant"
import LoginInputPhone from "./LoginInputPhone"
import LoginInputCode from "./LoginInputCode"
import Route from "../components/Route"

function Login()
{
    return (
        <Switch>
            <Route path={urlConstant.loginVerifyCode(":phone")} render={route => <LoginInputCode route={route}/>}/>
            <Route path="*" render={() => <LoginInputPhone/>}/>
        </Switch>
    )
}

export default Login