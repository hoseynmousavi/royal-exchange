import HomeHeader from "../components/HomeHeader"
import HomeFooter from "../components/HomeFooter"
import Material from "../components/Material"
import Select from "../components/Select"
import GetReserveTypes from "../../helpers/GetReserveTypes"
import {useRef, useState} from "react"
import Button from "../components/Button"
import Input from "../components/Input"
import GetReserveDate from "../../helpers/GetReserveDate"
import urlConstant from "../../constant/urlConstant"
import createQueryString from "../../helpers/createQueryString"
import toastManager from "../../helpers/toastManager"
import {FAIL_TOAST} from "../../constant/toastTypes"
import toastConstant from "../../constant/toastConstant"

function Reservation1Page({prices})
{
    const {timeBox} = prices
    const {lastUpdateDateString, lastUpdateTimeString} = timeBox || {}
    const [values, setValues] = useState({})
    const disable = !(values.productId && values.quantity && values.dateTimeId)
    const disableDate = !(values.productId && values.quantity)
    const disableDateTime = !(values.productId && values.quantity && values.date)
    const [isBuy, setIsBuy] = useState(true)
    const {productTypes} = GetReserveTypes()
    const resetDate = useRef(null)
    const resetDateTime = useRef(null)
    const {days, hours} = GetReserveDate({IsBuy: isBuy, ProductId: values.productId, Quantity: values.quantity, selectedDay: values.date})

    function changeField({name, value, reset})
    {
        if (name === "date" && reset) resetDate.current = reset
        if (name === "dateTimeId" && reset) resetDateTime.current = reset
        if (name === "productId" || name === "quantity")
        {
            if (resetDate.current) resetDate.current()
            if (resetDateTime.current) resetDateTime.current()
        }
        if (name === "date")
        {
            if (resetDateTime.current) resetDateTime.current()
        }
        setValues(values => ({...values, [name]: value}))
    }

    function toggleIsBuy(state)
    {
        return function ()
        {
            setIsBuy(state)
            if (resetDate.current) resetDate.current()
            if (resetDateTime.current) resetDateTime.current()
        }
    }

    function submit()
    {
        window.history.pushState("", "", urlConstant.reserve2 + createQueryString({params: {...values, isBuy}}))
    }

    function onDisableClick()
    {
        toastManager.addToast({type: FAIL_TOAST, message: toastConstant.selectFieldsFirst})
    }

    function onDisableTimeClick()
    {
        toastManager.addToast({type: FAIL_TOAST, message: toastConstant.selectFieldsFirstTime})
    }

    return (
        <>
            <HomeHeader title="نوبت‌دهی" lastUpdateDateString={lastUpdateDateString} lastUpdateTimeString={lastUpdateTimeString}/>
            <main className="home-main">
                <div className="home-main-content">
                    <div className="reserve">
                        <div className="reserve-select-type">
                            <Material className={`reserve-select-item ${isBuy ? "active" : ""}`} onClick={toggleIsBuy(true)}>سفارش خرید</Material>
                            <Material className={`reserve-select-item ${isBuy ? "" : "active"}`} onClick={toggleIsBuy(false)}>سفارش فروش</Material>
                        </div>
                        <Select name="productId"
                                placeholder="نوع ارز"
                                full_title="نوع ارز را انتخاب کنید"
                                items={productTypes.data}
                                onChange={changeField}
                        />
                        <Input name="quantity"
                               autoComplete="off"
                               type="number"
                               onChange={changeField}
                               placeholder="تعداد را مشخص کنید"
                               ltr
                               className="reserve-select-type-quantity"
                        />
                        <Select name="date"
                                placeholder="تاریخ"
                                full_title="تاریخ را انتخاب کنید"
                                items={days}
                                onChange={changeField}
                                disabled={disableDate}
                                onDisableClick={onDisableClick}
                        />
                        <Select name="dateTimeId"
                                placeholder="ساعت"
                                full_title="ساعت را انتخاب کنید"
                                items={hours}
                                onChange={changeField}
                                disabled={disableDateTime}
                                onDisableClick={onDisableTimeClick}
                        />
                        <Button className="reserve-btn" disable={disable} onClick={submit}>
                            مرحله بعد
                        </Button>
                    </div>
                </div>
            </main>
            <HomeFooter selected="reserve"/>
        </>
    )
}

export default Reservation1Page