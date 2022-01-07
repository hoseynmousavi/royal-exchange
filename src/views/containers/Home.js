import Switch from "../components/Switch"
import Route from "../components/Route"
import urlConstant from "../../constant/urlConstant"
import {lazy} from "react"
import GetPrices from "../../helpers/GetPrices"

const AboutPage = lazy(() => import("../pages/AboutPage"))
const ContactPage = lazy(() => import("../pages/ContactPage"))
const Reservation1Page = lazy(() => import("../pages/Reservation1Page"))
const Reservation2Page = lazy(() => import("../pages/Reservation2Page"))
const ProfilePage = lazy(() => import("../pages/ProfilePage"))
const HomePage = lazy(() => import("../pages/HomePage"))

function Home()
{
    const {prices, isLoading} = GetPrices()
    return (
        <Switch>
            <Route exact path={urlConstant.aboutUs} render={() => <AboutPage prices={prices}/>}/>
            <Route exact path={urlConstant.contactUs} render={() => <ContactPage prices={prices}/>}/>
            <Route exact path={urlConstant.reserve1} render={() => <Reservation1Page prices={prices}/>}/>
            <Route exact path={urlConstant.reserve2} render={() => <Reservation2Page prices={prices}/>}/>
            <Route exact path={urlConstant.profile} render={() => <ProfilePage prices={prices}/>}/>
            <Route exact path="*" render={() => <HomePage prices={prices} isLoading={isLoading}/>}/>
        </Switch>
    )
}

export default Home