import Material from "./Material"
import {useState} from "react"
import PriceItem from "./PriceItem"

function AllPricesList({currencies, golds})
{
    const [selectedTab, setSelectedTab] = useState("currency")
    const showData = (selectedTab === "gold" ? golds : currencies)

    function selectTab(item)
    {
        return function ()
        {
            setSelectedTab(item)
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
                            showData.sort((a, b) => a.productId - b.productId).map(item =>
                                <PriceItem key={item.productId} item={item} selectedTab={selectedTab}/>,
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