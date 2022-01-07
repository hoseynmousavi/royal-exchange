import {Suspense, lazy} from "react"
import Material from "./Material"
import KeyboardArrowSvg from "../../media/svg/KeyboardArrowSvg"
import {useEffect, useState} from "react"
import goBack from "../../helpers/goBack"
import RadioItem from "./RadioItem"

const VerticalPanel = lazy(() => import("./VerticalPanel"))

function Select({name, full_title, placeholder, title, items, defaultValue, onChange, disabled, onDisableClick})
{
    const [isShowPanel, setIsShowPanel] = useState(false)
    const [value, setValue] = useState(null)

    useEffect(() =>
    {
        if (defaultValue) setValue(items.filter(item => item.id === defaultValue)[0])
        // eslint-disable-next-line
    }, [])

    function hidePanel()
    {
        setIsShowPanel(false)
    }

    function showPanel()
    {
        setIsShowPanel(true)
    }

    function reset()
    {
        setValue(null)
        onChange({name, value: null})
    }

    function onItemSelect(item)
    {
        return function ()
        {
            setValue(item)
            onChange({name, value: item.id, reset})
            goBack()
        }
    }

    return (
        <>
            <label className="select-label">
                <p className="select-label-text">{title}</p>
                <Material className="select-main" onClick={showPanel} disable={disabled} onDisableClick={onDisableClick}>
                    <div className={`select-main-text ${value ? "active" : ""}`}>
                        {value?.name || placeholder || full_title || title}
                    </div>
                    <KeyboardArrowSvg className={`select-main-svg ${isShowPanel ? "show" : ""}`}/>
                </Material>
            </label>

            {
                isShowPanel &&
                <Suspense fallback={null}>
                    <VerticalPanel close={hidePanel}>
                        <div className="select-title">{full_title || title}</div>
                        <div className="select-items-cont">
                            {
                                items.map(item =>
                                    <RadioItem key={item.name} onClick={onItemSelect(item)} name={item.name} isActive={value?.id === item.id}/>,
                                )
                            }
                        </div>
                    </VerticalPanel>
                </Suspense>
            }
        </>
    )
}

export default Select