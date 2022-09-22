import {lazy, Suspense} from "react"
import ToastContainer from "./views/containers/ToastContainer"
import ThemeColorBar from "./views/components/ThemeColorBar"
import LoadingWrapper from "./views/containers/LoadingWrapper"
import Switch from "./views/components/Switch"
import urlConstant from "./constant/urlConstant"
import PrivateRoute from "./helpers/PrivateRoute"
import Route from "./views/components/Route"
import GetPrices from "./helpers/GetPrices"

const Login = lazy(() => import("./views/containers/Login"))
const Home = lazy(() => import("./views/containers/Home"))
const ContactPage = lazy(() => import("./views/pages/ContactPage"))
const HomePage = lazy(() => import("./views/pages/HomePage"))

function App({location})
{
    const {prices, isLoading} = GetPrices()
    return (
        <div id="index-temp" className="index-temp">
            <ThemeColorBar/>
            <Suspense fallback={<LoadingWrapper key="loading-wrapper"/>}>
                <Switch>
                    <Route exact path={urlConstant.home} render={() => <HomePage prices={prices} isLoading={isLoading}/>}/>
                    <Route exact path={urlConstant.contactUs} render={() => <ContactPage prices={prices}/>}/>
                    <PrivateRoute ifNotLogin dontChange path={urlConstant.login} render={() => <Login/>}/>
                    <PrivateRoute path="*" render={() => <Home prices={prices}/>}/>
                </Switch>
            </Suspense>
            <ToastContainer location={location}/>
        </div>
    )
}

export default App