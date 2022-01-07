import RadioBtnFillSvg from "../../media/svg/RadioBtnFillSvg"
import RadioBtnSvg from "../../media/svg/RadioBtnSvg"
import Material from "./Material"

function RadioItem({className = "", onClick, name, isActive, isRtl, rtlExtraContent})
{
    return (
        <Material className={`select-item ${className}`} onClick={onClick}>
            <div className={`select-item-title ${isRtl ? "rtl" : ""}`}>{name}</div>
            <RadioBtnFillSvg className={`select-item-radio ${isRtl ? "rtl" : ""} ${isActive ? "show" : ""}`}/>
            <RadioBtnSvg className={`select-item-radio ${isRtl ? "rtl" : ""} ${isActive ? "" : "show"}`}/>
            {
                isRtl && isActive && rtlExtraContent ?
                    rtlExtraContent
                    :
                    null
            }
        </Material>
    )
}

export default RadioItem