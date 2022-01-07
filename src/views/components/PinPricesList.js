import showPrice from "../../helpers/showPrice"

function PinPricesList({pins})
{
    return (
        <div className={`prices ${pins.length ? "" : "hide"}`}>
            <div className="price-row">
                {
                    pins.map((item, index) =>
                        <div key={item.name} className={`price-item ${pins.length > 1 ? index === 0 ? "first" : index === pins.length - 1 ? "last" : "" : "single"}`}>{item.name}</div>,
                    )
                }
            </div>
            <div className="price-row">
                {
                    pins.map((item, index) =>
                        <div key={item.price || item.buyPrice} className={`price-item second-theme ${pins.length > 1 ? index === 0 ? "first" : index === pins.length - 1 ? "last" : "" : "single"}`}>
                            {showPrice(item.price || item.buyPrice)}
                            <div>تومان</div>
                        </div>,
                    )
                }
            </div>
        </div>
    )
}

export default PinPricesList