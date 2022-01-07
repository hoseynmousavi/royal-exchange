import ImageShow from "./ImageShow"
import Material from "./Material"
import MainActions from "../../context/main/MainActions"
import {useContext, useState} from "react"
import {MainContext} from "../../context/main/MainReducer"
import showPrice from "../../helpers/showPrice"
import UnPinSvg from "../../media/svg/UnPinSvg"
import PinSvg from "../../media/svg/PinSvg"

function AllPricesList({currencies, golds})
{
    const {dispatch} = useContext(MainContext)
    const [selectedTab, setSelectedTab] = useState("currency")
    const showData = (selectedTab === "gold" ? golds : currencies)

    function selectTab(item)
    {
        return function ()
        {
            setSelectedTab(item)
        }
    }

    function togglePin(item)
    {
        return function ()
        {
            if (item.isPin)
            {
                MainActions.unPinPrice({productId: item.productId, dispatch})
            }
            else
            {
                MainActions.pinPrice({productId: item.productId, dispatch})
            }
        }
    }

    return (
        <div className="all-prices" style={{height: 40 + 32 + 21 + 16 + showData.length * 59 + "px"}}>
            <div className="all-prices-title">
                <Material backgroundColor="rgba(0,0,0,0.2)" className={`all-prices-title-item ${selectedTab === "currency" ? "active" : ""}`} onClick={selectTab("currency")}>قیمت ارز</Material>
                <Material backgroundColor="rgba(0,0,0,0.2)" className={`all-prices-title-item ${selectedTab === "gold" ? "active" : ""}`} onClick={selectTab("gold")}>قیمت طلا و سکه</Material>
            </div>
            {
                showData.length > 0 ?
                    <>
                        <div className="all-prices-table-title">
                            <div className="all-prices-table-title-item bigger">نام ارز</div>
                            <div className="all-prices-table-title-item">خرید</div>
                            <div className="all-prices-table-title-item">فروش</div>
                            {selectedTab === "currency" && <div className="all-prices-table-title-item">حواله</div>}
                            <div className="all-prices-table-title-item less title"/>
                        </div>
                        {
                            showData.map(item =>
                                <div key={item.productId} className="all-prices-table-title row">
                                    <div className="all-prices-table-title-item bigger normal-weight">
                                        <ImageShow className="all-prices-table-title-item-img" src={item.imageLink} alt={item.name}/>
                                        <div>{item.name}</div>
                                    </div>
                                    <div className="all-prices-table-title-item">{showPrice(item.buyPrice)}</div>
                                    <div className="all-prices-table-title-item">{showPrice(item.sellPrice)}</div>
                                    {selectedTab === "currency" && <div className="all-prices-table-title-item">{showPrice(item.remittancePrice)}</div>}
                                    <Material className="all-prices-table-title-item less" onClick={togglePin(item)}>
                                        {item.isPin ? <PinSvg className="all-prices-table-title-pin"/> : <UnPinSvg className="all-prices-table-title-pin"/>}
                                    </Material>
                                </div>,
                            )
                        }
                    </>
                    :
                    <div className="all-prices-table-404">موردی یافت نشد</div>
            }
        </div>
    )
}

export default AllPricesList