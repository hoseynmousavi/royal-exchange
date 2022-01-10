import HomeHeader from "../components/HomeHeader"
import HomeFooter from "../components/HomeFooter"
import {useContext, useEffect, useState} from "react"
import parseQueryString from "../../helpers/parseQueryString"
import urlConstant from "../../constant/urlConstant"
import Input from "../components/Input"
import {AuthContext} from "../../context/auth/AuthReducer"
import Button from "../components/Button"
import Material from "../components/Material"
import ImageShow from "../components/ImageShow"
import MainActions from "../../context/main/MainActions"
import toastManager from "../../helpers/toastManager"
import {SUCCESS_TOAST} from "../../constant/toastTypes"
import toastConstant from "../../constant/toastConstant"
import compressImage from "../../helpers/compressImage"

function Reservation2Page({prices})
{
    const {timeBox} = prices
    const {lastUpdateDateString, lastUpdateTimeString} = timeBox || {}
    const {state: user} = useContext(AuthContext)
    const [imageBase64, setImageBase64] = useState(null)
    const {firstName, lastName, username} = user
    const defaultName = firstName && lastName ? firstName + " " + lastName : ""
    const defaultPhone = username ? username : ""
    const [values, setValues] = useState({fullName: defaultName, mobilePhone: defaultPhone})
    const disable = !(values.fullName && values.mobilePhone && values.natioanalCode && imageBase64)
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() =>
    {
        const values = parseQueryString()
        if (!(values.dateTimeId && values.isBuy !== undefined && values.productId && values.quantity)) window.history.replaceState("", "", urlConstant.reserve1)
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
            fullName: values.fullName,
            mobilePhone: values.mobilePhone,
            natioanalCode: values.natioanalCode,
            imageBase64,
            ...parseQueryString(),
        })
            .then(() =>
            {
                setIsLoading(false)
                toastManager.addToast({type: SUCCESS_TOAST, message: toastConstant.reserveSuccess})
                window.history.replaceState("", "", urlConstant.home)
            })
            .catch(() => setIsLoading(false))
    }

    return (
        <>
            <HomeHeader title="نوبت‌دهی" lastUpdateDateString={lastUpdateDateString} lastUpdateTimeString={lastUpdateTimeString}/>
            <main className="home-main">
                <div className="home-main-content">
                    <div className="reserve">
                        <Input autoComplete="off" name="fullName" label="نام و نام خانوادگی" defaultValue={defaultName} placeholder="نام و نام خانوادگی خود را وارد کنید" onChange={onChange}/>
                        <Input autoComplete="off" name="natioanalCode" type="tel" label="کد ملی" placeholder="کد ملی خود را وارد کنید" ltr onChange={onChange} validation="national_code"/>
                        <Input autoComplete="off" name="mobilePhone" type="tel" label="شماره موبایل" defaultValue={defaultPhone} ltr onChange={onChange} validation="phone"/>
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
        </>
    )
}

export default Reservation2Page