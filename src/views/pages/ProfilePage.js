import HomeHeader from "../components/HomeHeader"
import Input from "../components/Input"
import Button from "../components/Button"
import {useContext, useState} from "react"
import {AuthContext} from "../../context/auth/AuthReducer"
import AuthActions from "../../context/auth/AuthActions"
import toastManager from "../../helpers/toastManager"
import {SUCCESS_TOAST} from "../../constant/toastTypes"
import toastConstant from "../../constant/toastConstant"
import Material from "../components/Material"
import createMaterialColor from "../../helpers/createMaterialColor"
import logoutManager from "../../helpers/logoutManager"

function ProfilePage({prices})
{
    const {state: user, dispatch} = useContext(AuthContext)
    const {firstName, lastName, email, username} = user
    const {timeBox} = prices
    const {lastUpdateDateString, lastUpdateTimeString} = timeBox || {}
    const [isLoading, setIsLoading] = useState(false)
    const [values, setValues] = useState({firstName: firstName || "", lastName: lastName || "", email: email || ""})
    const disable = Object.values(values).some(item => item === null)

    function onChange({name, value})
    {
        setValues(values => ({...values, [name]: value}))
    }

    function submit()
    {
        setIsLoading(true)
        AuthActions.editProfile({data: values, dispatch})
            .then(() =>
            {
                toastManager.addToast({type: SUCCESS_TOAST, message: toastConstant.profileUpdated})
                setIsLoading(false)
            })
            .catch(() => setIsLoading(false))
    }

    return (
        <>
            <HomeHeader back="صفحه اصلی" title="پروفایل" lastUpdateDateString={lastUpdateDateString} lastUpdateTimeString={lastUpdateTimeString}/>
            <main className="home-main no-footer">
                <div className="home-main-content">
                    <div className="profile">
                        <Input name="firstName" label="نام" defaultValue={firstName} placeholder="نام خود را وارد کنید" onChange={onChange}/>
                        <Input name="lastName" label="نام خانوادگی" defaultValue={lastName} placeholder="نام خانوادگی خود را وارد کنید" onChange={onChange}/>
                        <Input name="phone" label="شماره موبایل" defaultValue={username} disabled ltr onChange={onChange}/>
                        <Input name="email" label="ایمیل" defaultValue={email} ltr placeholder="ایمیل خود را وارد کنید" validation="email" onChange={onChange}/>
                        <br/>
                        <Button loading={isLoading} disable={disable} onClick={submit}>
                            بروزرسانی
                        </Button>
                        <Material className="profile-logout" onClick={logoutManager.logout} backgroundColor={createMaterialColor({variable: "--toast-fail-text"})}>خروج از حساب کاربری</Material>
                    </div>
                </div>
            </main>
        </>
    )
}

export default ProfilePage