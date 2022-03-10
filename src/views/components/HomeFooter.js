import Material from "./Material"
import HouseSvg from "../../media/svg/HouseSvg"
import ContactSvg from "../../media/svg/ContactSvg"
import HouseSelectedSvg from "../../media/svg/HouseSelectedSvg"
import ContactSelectedSvg from "../../media/svg/ContactSelectedSvg"
import ClockSvg from "../../media/svg/ClockSvg"
import ClockSelectedSvg from "../../media/svg/ClockSelectedSvg"
import urlConstant from "../../constant/urlConstant"

function HomeFooter({selected})
{
    function goTo(type)
    {
        return function ()
        {
            if (type === "reserve") window.history.pushState("", "", urlConstant.reserve1)
            else if (type === "home") window.history.pushState("", "", urlConstant.home)
            else if (type === "contact") window.history.pushState("", "", urlConstant.contactUs)
        }
    }

    return (
        <footer className="footer">
            <Material className="footer-item" onClick={goTo("reserve")}>
                {
                    selected === "reserve" ?
                        <ClockSelectedSvg className="footer-item-icon"/>
                        :
                        <ClockSvg className="footer-item-icon"/>
                }
                <div className="footer-item-text">نوبت‌دهی</div>
            </Material>
            <Material className="footer-item" onClick={goTo("home")}>
                {
                    selected === "home" ?
                        <HouseSelectedSvg className="footer-item-icon"/>
                        :
                        <HouseSvg className="footer-item-icon"/>
                }
                <div className="footer-item-text">صفحه‌اصلی</div>
            </Material>
            <Material className="footer-item" onClick={goTo("contact")}>
                {
                    selected === "contact" ?
                        <ContactSelectedSvg className="footer-item-icon"/>
                        :
                        <ContactSvg className="footer-item-icon"/>
                }
                <div className="footer-item-text">ارتباط‌با‌ما</div>
            </Material>
        </footer>
    )
}

export default HomeFooter