import {useLayoutEffect, useRef, useState} from "react"
import numberCorrection from "../../helpers/numberCorrection"

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
        const inputValue = numberCorrection(eventValue)
        if (inputValue.length <= 15)
        {
            setValue(inputValue)
            if (inputValue.length >= 11) onChange(inputValue)
            else onChange(null)
        }
    }

    return (
        <div className="phone-input-cont">
            <input className="phone-input" ref={inputRef} value={value} max={15} type="tel" onChange={onInputChange}/>
        </div>
    )
}

export default PhoneInput