import HomeHeader from "../components/HomeHeader"
import HomeFooter from "../components/HomeFooter"
import {useContext, useEffect, useState} from "react"
import parseQueryString from "../../helpers/parseQueryString"
import urlConstant from "../../constant/urlConstant"
import Input from "../components/Input"
import {AuthContext} from "../../context/auth/AuthReducer"
import Button from "../components/Button"
import MainActions from "../../context/main/MainActions"
import Material from "../components/Material"
import ImageShow from "../components/ImageShow"
import compressImage from "../../helpers/compressImage"

function Reservation2Page({prices})
{
    const {timeBox} = prices
    const {lastUpdateDateString, lastUpdateTimeString} = timeBox || {}
    const {dateTimeId, isBuy, productId, quantity, hour, date, productName} = parseQueryString()
    const {state: user} = useContext(AuthContext)
    const [imageBase64, setImageBase64] = useState(null)
    const {firstName, lastName, username} = user
    const defaultName = firstName && lastName ? firstName + " " + lastName : ""
    const defaultPhone = username ? username : ""
    const [values, setValues] = useState({fullName: defaultName, mobilePhone: defaultPhone})
    const {fullName, mobilePhone, natioanalCode, phone, postalCode, address} = values
    const disable = !(fullName && mobilePhone && natioanalCode && phone && postalCode && address)
    const [isLoading, setIsLoading] = useState(false)
    const [showModal, setShowModal] = useState(false)

    useEffect(() =>
    {
        if (!(dateTimeId && isBuy !== undefined && productId && quantity)) window.history.replaceState("", "", urlConstant.reserve1)
        // eslint-disable-next-line
    }, [])

    function onChange({name, value})
    {
        setValues(values => ({...values, [name]: value}))
    }

    function selectPhoto(e)
    {
        const file = e.target.files[0]
        compressImage(file).then(img =>
        {
            const reader = new FileReader()
            reader.readAsDataURL(img)
            reader.onload = () => setImageBase64(reader.result)
        })
    }

    function submit()
    {
        setIsLoading(true)
        MainActions.setReserve({
            fullName,
            mobilePhone,
            natioanalCode,
            imageBase64,
            phone,
            postalCode,
            address,
            dateTimeId,
            isBuy,
            productId,
            quantity,
        })
            .then(res =>
            {
                setIsLoading(false)
                setShowModal(res.data.trackingCode)
            })
            .catch(() => setIsLoading(false))
    }

    function goOut()
    {
        window.history.replaceState("", "", urlConstant.home)
    }

    function anotherTime()
    {
        window.history.replaceState("", "", urlConstant.reserve1)
    }

    return (
        <>
            <HomeHeader title="نوبت‌دهی" lastUpdateDateString={lastUpdateDateString} lastUpdateTimeString={lastUpdateTimeString}/>
            <main className="home-main">
                <div className="home-main-content">
                    <div className="reserve">
                        <Input required autoComplete="off" name="fullName" label="نام و نام خانوادگی" defaultValue={defaultName} placeholder="نام و نام خانوادگی خود را وارد کنید" onChange={onChange}/>
                        <Input required autoComplete="off" name="natioanalCode" type="tel" label="کد ملی" placeholder="کد ملی خود را وارد کنید" ltr onChange={onChange} validation="national_code"/>
                        <Input required autoComplete="off" name="mobilePhone" type="tel" label="شماره موبایل" placeholder="شماره موبایل خود را وارد کنید" defaultValue={defaultPhone} ltr onChange={onChange} validation="phone"/>
                        <Input required autoComplete="off" name="phone" type="tel" label="تلفن ثابت" placeholder="تلفن ثابت خود را وارد کنید" ltr onChange={onChange} validation="home_phone"/>
                        <Input required autoComplete="off" name="postalCode" type="tel" label="کد پستی" placeholder="کد پستی خود را وارد کنید" ltr onChange={onChange} validation="post"/>
                        <Input required autoComplete="off" name="address" label="آدرس" placeholder="آدرس خود را وارد کنید" onChange={onChange} validation="address"/>
                        <p className="input-label-text">تصویر کارت ملی</p>
                        <label>
                            <Material isDiv className="reserve-photo" backgroundColor="rgba(0,0,0,0.1)">
                                {
                                    imageBase64 ?
                                        <ImageShow className="reserve-photo-show" src={imageBase64}/>
                                        :
                                        <div className="reserve-photo-icon">+</div>
                                }
                            </Material>
                            <input hidden type="file" accept="image/*" onChange={selectPhoto}/>
                        </label>
                        <Button className="reserve-btn" loading={isLoading} disable={disable} onClick={submit}>
                            ثبت نوبت
                        </Button>
                    </div>
                </div>
            </main>
            <HomeFooter selected="reserve"/>

            {
                !!showModal &&
                <>
                    <div className="vertical-panel-back modal show" onClick={goOut}/>
                    <div className="reserve-modal">
                        <div className="reserve-modal-name">{fullName}</div>
                        <br/>
                        <div className="reserve-modal-name">سفارش {isBuy ? "خرید" : "فروش"}</div>
                        <div className="reserve-modal-type">{quantity} {productName}</div>
                        <div className="reserve-modal-type">تاریخ حضور:</div>
                        <div className="reserve-modal-type">{date}</div>
                        <div className="reserve-modal-type">ساعت {hour}</div>
                        <br/>
                        <div className="reserve-modal-type">شماره پیگیری:</div>
                        <div className="reserve-modal-name">{showModal}</div>
                        <br/>
                        <Button onClick={anotherTime}>نوبت جدید</Button>
                    </div>
                </>
            }
        </>
    )
}

export default Reservation2Page