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

function Reservation1Page({prices})
{
    const {timeBox} = prices
    const {lastUpdateDateString, lastUpdateTimeString} = timeBox || {}
    const [values, setValues] = useState({})
    const disable = !(values.productId && values.quantity && values.dateTimeId)
    const [isBuy, setIsBuy] = useState(true)
    const {productTypes} = GetReserveTypes()
    const resetDate = useRef(null)
    const {data} = GetReserveDate({IsBuy: isBuy, ProductId: values.productId, Quantity: values.quantity})
    const dateItems = []
    if (data?.list?.length)
    {
        for (let i = 0; i < data.list.length; i++)
        {
            const item = data.list[i]
            for (let j = 0; j < item.times.length; j++)
            {
                const innerItem = item.times[j]
                dateItems.push({name: item.dateString + " " + innerItem.timeString, id: innerItem.dateTimeId})
            }
        }
    }

    function changeField({name, value, reset})
    {
        if (name === "dateTimeId" && reset) resetDate.current = reset
        if (name !== "dateTimeId" && resetDate.current) resetDate.current()
        setValues(values => ({...values, [name]: value}))
    }

    function toggleIsBuy(state)
    {
        return function ()
        {
            setIsBuy(state)
            if (resetDate.current) resetDate.current()
        }
    }

    function submit()
    {
        window.history.pushState("", "", urlConstant.reserve2 + createQueryString({params: {...values, isBuy}}))
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
                        <Select name="dateTimeId"
                                placeholder="تاریخ و ساعت"
                                full_title="تاریخ و ساعت را انتخاب کنید"
                                items={dateItems}
                                onChange={changeField}
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