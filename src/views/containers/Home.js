import Switch from "../components/Switch"
import Route from "../components/Route"
import urlConstant from "../../constant/urlConstant"
import {lazy} from "react"

const AboutPage = lazy(() => import("../pages/AboutPage"))
const Reservation1Page = lazy(() => import("../pages/Reservation1Page"))
const Reservation2Page = lazy(() => import("../pages/Reservation2Page"))
const ProfilePage = lazy(() => import("../pages/ProfilePage"))

function Home({prices})
{
    return (
        <Switch desktopAnime>
            <Route exact path={urlConstant.aboutUs} render={() => <AboutPage prices={prices}/>}/>
            <Route exact path={urlConstant.reserve1} render={() => <Reservation1Page prices={prices}/>}/>
            <Route exact path={urlConstant.reserve2} render={() => <Reservation2Page prices={prices}/>}/>
            <Route exact path={urlConstant.profile} render={() => <ProfilePage prices={prices}/>}/>
        </Switch>
    )
}

export default Home