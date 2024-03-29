import {useContext, useMemo} from "react"
import {AuthContext} from "../context/auth/AuthReducer"
import Route from "../views/components/Route"
import Redirect from "../views/components/Redirect"
import urlConstant from "../constant/urlConstant"

function PrivateRoute({ifNotLogin, dontChange, path, render, ...props})
{
    const {state: user} = useContext(AuthContext)

    return useMemo(() =>
    {
        if (ifNotLogin)
        {
            if (!user) return <Route path={path} render={render} {...props}/>
            else return <Redirect to={urlConstant.home}/>
        }
        else
        {
            if (user) return <Route path={path} render={render} {...props}/>
            else
            {
                const {pathname} = window.location
                return <Redirect to={`${urlConstant.login}${pathname !== "/" ? `?returnTo=${pathname}` : ""}`}/>
            }
        }
        // eslint-disable-next-line
    }, dontChange ? [] : [props, user])
}

export default PrivateRoute