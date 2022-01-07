import HomeHeader from "../components/HomeHeader"
import HomeFooter from "../components/HomeFooter"
import GetContact from "../../helpers/GetContact"
import MyLoader from "../components/MyLoader"
import KeyboardArrowSvg from "../../media/svg/KeyboardArrowSvg"
import AboutSvg from "../../media/svg/AboutSvg"
import CallSvg from "../../media/svg/CallSvg"
import WhatsAppSvg from "../../media/svg/WhatsAppSvg"
import LocationSvg from "../../media/svg/LocationSvg"
import Link from "../components/Link"
import urlConstant from "../../constant/urlConstant"

function ContactPage({prices})
{
    const {timeBox} = prices
    const {lastUpdateDateString, lastUpdateTimeString} = timeBox || {}
    const {isLoading, contact} = GetContact()
    return (
        <>
            <HomeHeader title="تماس با ما" lastUpdateDateString={lastUpdateDateString} lastUpdateTimeString={lastUpdateTimeString}/>
            <main className="home-main">
                {
                    isLoading ?
                        <MyLoader width={40}/>
                        :
                        <div className="home-main-content">
                            <h1 className="contact-about">{contact.supportText}</h1>
                            <a href={`tel:${contact.directPhone}`} className="contact-item-btn">
                                <div className="contact-item-btn-right">
                                    <CallSvg className="contact-item-btn-svg"/>
                                    <div className="contact-item-btn-text">تماس مستقیم</div>
                                </div>
                                <div className="contact-item-btn-right">
                                    <div>{contact.directPhone}</div>
                                    <KeyboardArrowSvg className="contact-item-btn-arrow"/>
                                </div>
                            </a>
                            <a href={`https://wa.me/${contact.supportPhone.replace("09", "+989")}`} className="contact-item-btn">
                                <div className="contact-item-btn-right">
                                    <WhatsAppSvg className="contact-item-btn-svg"/>
                                    <div className="contact-item-btn-text">پشتیبانی آنلاین</div>
                                </div>
                                <div className="contact-item-btn-right">
                                    <div>{contact.supportPhone}</div>
                                    <KeyboardArrowSvg className="contact-item-btn-arrow"/>
                                </div>
                            </a>
                            <a target="_blank" href={`https://www.google.com/maps/place/${contact.address.latitude},${contact.address.longitude}`} className="contact-item-btn">
                                <div className="contact-item-btn-right">
                                    <LocationSvg className="contact-item-btn-svg"/>
                                    <div className="contact-item-btn-text">آدرس حضوری</div>
                                </div>
                                <div className="contact-item-btn-right">
                                    <KeyboardArrowSvg className="contact-item-btn-arrow"/>
                                </div>
                            </a>
                            <Link to={urlConstant.aboutUs} className="contact-item-btn">
                                <div className="contact-item-btn-right">
                                    <AboutSvg className="contact-item-btn-svg"/>
                                    <div className="contact-item-btn-text">درباره صرافی رویال</div>
                                </div>
                                <div className="contact-item-btn-right">
                                    <KeyboardArrowSvg className="contact-item-btn-arrow"/>
                                </div>
                            </Link>
                        </div>
                }
            </main>
            <HomeFooter selected="contact"/>
        </>
    )
}

export default ContactPage