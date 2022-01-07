import ImageShow from "./ImageShow"
import Material from "./Material"
import MainActions from "../../context/main/MainActions"
import {useContext} from "react"
import {MainContext} from "../../context/main/MainReducer"
import showPrice from "../../helpers/showPrice"
import UnPinSvg from "../../media/svg/UnPinSvg"
import PinSvg from "../../media/svg/PinSvg"

function AllPricesList({currencies})
{
    const {dispatch} = useContext(MainContext)

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
        <div className="all-prices">
            <div className="all-prices-title">
                <div className="all-prices-title-item first">قیمت ارز</div>
                <div className="all-prices-title-item second">قیمت طلا و سکه</div>
            </div>
            <div className="all-prices-table-title">
                <div className="all-prices-table-title-item bigger">نام ارز</div>
                <div className="all-prices-table-title-item">خرید</div>
                <div className="all-prices-table-title-item">فروش</div>
                <div className="all-prices-table-title-item">حواله</div>
                <div className="all-prices-table-title-item less title"/>
            </div>
            {
                currencies.map(item =>
                    <div key={item.productId} className="all-prices-table-title row">
                        <div className="all-prices-table-title-item bigger normal-weight">
                            <ImageShow className="all-prices-table-title-item-img" src={item.imageLink} alt={item.name}/>
                            <div>{item.name}</div>
                        </div>
                        <div className="all-prices-table-title-item">{showPrice(item.buyPrice)}</div>
                        <div className="all-prices-table-title-item">{showPrice(item.sellPrice)}</div>
                        <div className="all-prices-table-title-item">{showPrice(item.remittancePrice)}</div>
                        <Material className="all-prices-table-title-item less" onClick={togglePin(item)}>
                            {item.isPin ? <PinSvg className="all-prices-table-title-pin"/> : <UnPinSvg className="all-prices-table-title-pin"/>}
                        </Material>
                    </div>,
                )
            }
        </div>
    )
}

export default AllPricesList