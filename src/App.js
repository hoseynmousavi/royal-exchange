import {lazy, Suspense} from "react"
import ToastContainer from "./views/containers/ToastContainer"
import ThemeColorBar from "./views/components/ThemeColorBar"
import LoadingWrapper from "./views/containers/LoadingWrapper"
import Switch from "./views/components/Switch"
import urlConstant from "./constant/urlConstant"
import PrivateRoute from "./helpers/PrivateRoute"

const Login = lazy(() => import("./views/containers/Login"))
const Home = lazy(() => import("./views/containers/Home"))

function App({location})
{
    return (
        <div id="index-temp" className="index-temp">
            <ThemeColorBar/>
            <Suspense fallback={<LoadingWrapper key="loading-wrapper"/>}>
                <Switch>
                    <PrivateRoute ifNotLogin dontChange path={urlConstant.login} render={() => <Login/>}/>
                    <PrivateRoute path="*" render={() => <Home/>}/>
                </Switch>
            </Suspense>
            <ToastContainer location={location}/>
        </div>
    )
}

export default App