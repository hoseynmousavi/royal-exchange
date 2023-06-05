import {useEffect, useRef, useState} from "react"
import regexConstant from "../../constant/regexConstant"
import checkNationalCode from "../../helpers/checkNationalCode"
import numberCorrection from "../../helpers/numberCorrection"
import inputKeyDownEnter from "../../helpers/inputKeyDownEnter"
import toastConstant from "../../constant/toastConstant"
import MyLoader from "./MyLoader"
import CheckSvg from "../../media/svg/CheckSvg"
import CloseSvg from "../../media/svg/CloseSvg"

function Input({
                   className, name, autoComplete = "on", focusOnMountDesktop, label, type = "text", validation, placeholder = "", checkExist = true,
                   defaultValue, onChange, disabled, ltr, ltrPlaceHolder, Icon, required, onSubmit, onSubmitDisable, disableSubmit, labelClassName, iconClassName, noSpace,
               })
{
    const [value, setValue] = useState("")
    const [error, setError] = useState("")
    const inputRef = useRef(null)
    const validationTimer = useRef(null)

    useEffect(() =>
    {
        if (focusOnMountDesktop && window.innerWidth > 480) setTimeout(() => inputRef?.current?.focus(), 300)
        if (defaultValue)
        {
            if (validation)
            {
                if (validation === "email" || validation === "url")
                {
                    const value = numberCorrection(defaultValue.trim())
                    setValue(value)
                }
                else if (validation === "national_code")
                {
                    const value = numberCorrection(defaultValue.trim())
                    if (!isNaN(value) && value.length <= 10) setValue(value)
                }
                else if (validation === "phone")
                {
                    const value = numberCorrection(defaultValue.trim())
                    if (!isNaN(value) && value.length <= 11) setValue(value)
                }
                else if (validation === "password")
                {
                    const value = defaultValue
                    if (value.length >= 6) setValue(value)
                }
            }
            else setValue(defaultValue.trim())
        }

        return () => clearTimeout(validationTimer.current)
        // eslint-disable-next-line
    }, [])

    function onInputChange(e)
    {
        if (validation)
        {
            if (validation === "email")
            {
                const value = numberCorrection(e.target.value.trim())
                setValue(value)
                if (regexConstant.EMAIL_REGEX.test(value)) onChange({name, value})
                else onChange({name, value: value || required ? null : ""})
                checkErrTimer()
            }
            else if (validation === "national_code")
            {
                const value = numberCorrection(e.target.value.trim().slice(0, 10))
                if (!isNaN(value) && value.length <= 10) setValue(value)
                if (checkNationalCode(value)) onChange({name, value})
                else onChange({name, value: value || required ? null : ""})
                checkErrTimer()
            }
            else if (validation === "phone")
            {
                const value = numberCorrection(e.target.value.trim().slice(0, 11))
                if (!isNaN(value) && value.length <= 11) setValue(value)
                if (regexConstant.PHONE_REGEX.test(value)) onChange({name, value})
                else onChange({name, value: value || required ? null : ""})
                checkErrTimer()
            }
            else if (validation === "home_phone")
            {
                const value = numberCorrection(e.target.value.trim().slice(0, 11))
                if (!isNaN(value) && value.length <= 11) setValue(value)
                if (regexConstant.HOME_PHONE_REGEX.test(value)) onChange({name, value})
                else onChange({name, value: value || required ? null : ""})
                checkErrTimer()
            }
            else if (validation === "post")
            {
                const value = numberCorrection(e.target.value.trim().slice(0, 10))
                if (!isNaN(value) && value.length <= 10) setValue(value)
                if (value.length === 10) onChange({name, value})
                else onChange({name, value: value || required ? null : ""})
                checkErrTimer()
            }
            else if (validation === "address")
            {
                const value = numberCorrection(e.target.value)
                setValue(value)
                if (value.length >= 10) onChange({name, value})
                else onChange({name, value: value || required ? null : ""})
                checkErrTimer()
            }
            else if (validation === "url")
            {
                const value = numberCorrection(e.target.value.trim())
                setValue(value)
                if (regexConstant.URL_REGEX.test(value)) onChange({name, value})
                else onChange({name, value: value || required ? null : ""})
                checkErrTimer()
            }
            else if (validation === "password")
            {
                const value = e.target.value
                setValue(value)
                if (value.length >= 6) onChange({name, value})
                else onChange({name, value: value || required ? null : ""})
                checkErrTimer()
            }
        }
        else
        {
            const {value} = e.target
            setValue(value)
            onChange({name, value: value.trim() ? numberCorrection(value.trim()) : required ? null : ""})
            checkErrTimer()
        }
        setError("")
    }

    function checkErrTimer()
    {
        clearTimeout(validationTimer.current)
        validationTimer.current = setTimeout(onInputBlur, 800)
    }

    function onInputBlur()
    {
        const tempValue = inputRef.current.value
        let tempErr = ""
        if (!tempValue)
        {
            if (required) tempErr = toastConstant.requiredField
        }
        else
        {
            if (validation)
            {
                if (validation === "email")
                {
                    if (!regexConstant.EMAIL_REGEX.test(tempValue)) tempErr = toastConstant.unValidEmail
                }
                else if (validation === "national_code")
                {
                    if (!checkNationalCode(tempValue)) tempErr = toastConstant.unValidNationalCode
                }
                else if (validation === "phone")
                {
                    if (!regexConstant.PHONE_REGEX.test(tempValue)) tempErr = toastConstant.unValidPhone
                }
                else if (validation === "home_phone")
                {
                    if (!regexConstant.HOME_PHONE_REGEX.test(tempValue)) tempErr = toastConstant.unValidPhoneHome
                }
                else if (validation === "url")
                {
                    if (!regexConstant.URL_REGEX.test(tempValue)) tempErr = toastConstant.unValidUrl
                }
                else if (validation === "password")
                {
                    if (tempValue.length < 6) tempErr = toastConstant.unValidPassword
                }
                else if (validation === "post")
                {
                    if (tempValue.length < 10) tempErr = toastConstant.unValidPost
                }
                else if (validation === "address")
                {
                    if (tempValue.length < 10) tempErr = toastConstant.unValidAddress
                }
            }
        }
        setError(tempErr)
    }

    return (
        <label className={`input-label ${className}`}>
            <p className={`input-label-text ${labelClassName}`}>{label}</p>
            <div className="input-label-relative">
                <input autoComplete={autoComplete}
                       name={name}
                       className={`input-main ${ltrPlaceHolder ? "ltr-placeholder" : ""} ${Icon || (validation && value) ? "have-icon" : ""} ${error ? "err" : ""} ${ltr ? "ltr" : ""}`}
                       disabled={disabled}
                       ref={inputRef}
                       type={type}
                       placeholder={placeholder}
                       value={value}
                       onChange={onInputChange}
                       onBlur={onInputBlur}
                       onKeyDown={onSubmit || onSubmitDisable ? inputKeyDownEnter({onSubmit, onSubmitDisable, disableSubmit, checkValidation: onInputBlur}) : undefined}
                />
                {
                    Icon ?
                        <Icon className={`input-icon icon ${iconClassName} ${ltr ? "" : "rtl"}`}/>
                        :
                        <>
                            <MyLoader width={24} className={`input-icon validation ${iconClassName} ${ltr ? "" : "rtl"}`}/>
                            <CheckSvg className={`input-icon validation ${iconClassName} ${ltr ? "" : "rtl"}`}/>
                            <CloseSvg className={`input-icon validation ${iconClassName} ${ltr ? "" : "rtl"}`}/>
                        </>
                }
            </div>
            <div className={`input-label-err ${noSpace ? "no-space" : ""} ${error ? "show" : ""}`}>{error}</div>
        </label>
    )
}

export default Input