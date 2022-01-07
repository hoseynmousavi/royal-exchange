import LogoText from "./LogoText"
import UserSvg from "../../media/svg/UserSvg"
import MyLoader from "./MyLoader"
import BackSvg from "../../media/svg/BackSvg"
import Material from "./Material"
import goBack from "../../helpers/goBack"
import Link from "./Link"
import urlConstant from "../../constant/urlConstant"

function HomeHeader({back, title, lastUpdateDateString, lastUpdateTimeString})
{
    const isLoading = !lastUpdateDateString || !lastUpdateTimeString
    return (
        <>
            <header className="header">
                <div className="header-effect"/>
                <div className="header-content">
                    <LogoText className="header-logo"/>
                    <div className="header-items">
                        <Link to={urlConstant.profile}>
                            <UserSvg className="header-user"/>
                        </Link>
                        <div className="header-date">
                            <div className="header-date-title">{title}</div>
                            <div className={`header-date-desc ${isLoading ? "is-loading" : ""}`}>
                                {
                                    isLoading ?
                                        <MyLoader width={20}/>
                                        :
                                        <>
                                            <div className="header-date-desc-date">{lastUpdateDateString}</div>
                                            <div>ساعت {lastUpdateTimeString}</div>
                                        </>
                                }
                            </div>
                        </div>
                    </div>
                </div>
                {
                    back &&
                    <Material className="header-back" onClick={goBack}>
                        {back}
                        <BackSvg className="header-back-icon"/>
                    </Material>
                }
            </header>
        </>
    )
}

export default HomeHeader