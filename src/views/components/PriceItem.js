import ImageShow from "./ImageShow"
import showPrice from "../../helpers/showPrice"
import Material from "./Material"
import createMaterialColor from "../../helpers/createMaterialColor"
import PinSvg from "../../media/svg/PinSvg"
import UnPinSvg from "../../media/svg/UnPinSvg"
import MainActions from "../../context/main/MainActions"
import {useContext, useState} from "react"
import {MainContext} from "../../context/main/MainReducer"
import MyLoader from "./MyLoader"

function PriceItem({item, selectedTab})
{
    const {dispatch} = useContext(MainContext)
    const [isLoading, setIsLoading] = useState(false)

    function togglePin()
    {
        setIsLoading(true)
        if (item.isPin)
        {
            MainActions.unPinPrice({productId: item.productId, selectedTab, dispatch})
                .then(() => setIsLoading(false))
                .catch(() => setIsLoading(false))
        }
        else
        {
            MainActions.pinPrice({productId: item.productId, selectedTab, dispatch})
                .then(() => setIsLoading(false))
                .catch(() => setIsLoading(false))
        }
    }

    return (
        <div className="all-prices-table-title row">
            <div className="all-prices-table-title-item bigger normal-weight">
                <ImageShow className="all-prices-table-title-item-img" src={item.imageLink} alt={item.name}/>
                <div>{item.name}</div>
            </div>
            <div className="all-prices-table-title-item">{showPrice(item.buyPrice)}</div>
            <div className="all-prices-table-title-item">{showPrice(item.sellPrice)}</div>
            {selectedTab === "currency" && <div className="all-prices-table-title-item">{showPrice(item.remittancePrice)}</div>}
            <Material backgroundColor={createMaterialColor({variable: "--first-color"})} className="all-prices-table-title-item less" onClick={togglePin}>
                {
                    isLoading ?
                        <MyLoader width={16}/>
                        :
                        item.isPin ?
                            <PinSvg className="all-prices-table-title-pin"/>
                            :
                            <UnPinSvg className="all-prices-table-title-pin"/>
                }
            </Material>
        </div>
    )
}

export default PriceItem