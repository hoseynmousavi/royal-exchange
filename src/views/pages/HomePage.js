import HomeHeader from "../components/HomeHeader"
import AllPricesList from "../components/AllPricesList"
import PinPricesList from "../components/PinPricesList"
import MyLoader from "../components/MyLoader"
import HomeFooter from "../components/HomeFooter"

function HomePage({prices, isLoading})
{
    const {pins, timeBox, currencies} = prices
    const {lastUpdateDateString, lastUpdateTimeString} = timeBox || {}
    return (
        <>
            <HomeHeader title="تابلو قیمت" lastUpdateDateString={lastUpdateDateString} lastUpdateTimeString={lastUpdateTimeString}/>
            <main className="home-main">
                {
                    isLoading ?
                        <MyLoader width={40}/>
                        :
                        <div className="home-main-content">
                            <PinPricesList pins={pins}/>
                            <AllPricesList currencies={currencies}/>
                        </div>
                }
            </main>
            <HomeFooter selected="home"/>
        </>
    )
}

export default HomePage