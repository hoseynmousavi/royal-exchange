import HomeHeader from "../components/HomeHeader"
import GetContact from "../../helpers/GetContact"
import MyLoader from "../components/MyLoader"

function AboutPage({prices})
{
    const {timeBox} = prices
    const {lastUpdateDateString, lastUpdateTimeString} = timeBox || {}
    const {isLoading, contact} = GetContact()
    return (
        <>
            <HomeHeader back="ارتباط با ما" title="تماس با ما" lastUpdateDateString={lastUpdateDateString} lastUpdateTimeString={lastUpdateTimeString}/>
            <main className="home-main no-footer">
                {
                    isLoading ?
                        <MyLoader width={40}/>
                        :
                        <div className="home-main-content">
                            <h1 className="about-page-title">درباره صرافی رویال</h1>
                            <div className="about-page-desc">
                                {contact.aboutUs}
                            </div>
                            <a className="about-page-link" href={contact.site} target="_blank" rel="noreferrer">ورود به سایت</a>
                        </div>
                }
            </main>
        </>
    )
}

export default AboutPage