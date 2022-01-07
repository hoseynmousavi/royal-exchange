import {useLayoutEffect, useRef, useState} from "react"
import numberCorrection from "../../helpers/numberCorrection"
import verifyCodeConstant from "../../constant/verifyCodeConstant"

function PhoneInput({onChange})
{
    const [value, setValue] = useState("")
    const inputRef = useRef(null)

    useLayoutEffect(() =>
    {
        if (window.innerWidth > 480) setTimeout(() => inputRef?.current?.focus(), 300)
    }, [])

    function onInputChange(e)
    {
        const {value: eventValue} = e.target
        const inputValue = numberCorrection(eventValue.replace(/ /g, "").replace(verifyCodeConstant.phoneSeparatorRemove, ""))
        if (inputValue.length <= 9 && !isNaN(inputValue))
        {
            setValue(inputValue)
            if (inputValue.length === 9) onChange("09" + inputValue)
            else onChange(null)
        }
    }

    function showPhone(input)
    {
        return input && !isNaN(input) ?
            input.length >= 6 ?
                input.slice(0, 2) + verifyCodeConstant.phoneSeparator + input.slice(2, 5) + verifyCodeConstant.phoneSeparator + input.slice(5, input.length)
                :
                input.length >= 3 ?
                    input.slice(0, 2) + verifyCodeConstant.phoneSeparator + input.slice(2, input.length)
                    :
                    input
            :
            input
    }

    return (
        <div className="phone-input-cont">
            <input className="phone-input" ref={inputRef} value={showPhone(value)} max={9} type="tel" onChange={onInputChange}/>
            <div className={`phone-input-placeholder ${value.length > 0 ? "active" : ""}`}>۰۹</div>
        </div>
    )
}

export default PhoneInput