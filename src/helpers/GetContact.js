import {useContext, useEffect} from "react"
import {MainContext} from "../context/main/MainReducer"
import MainActions from "../context/main/MainActions"

function GetContact()
{
    const {state: {contact}, dispatch} = useContext(MainContext)
    const isLoading = !contact.getDone

    useEffect(() =>
    {
        if (isLoading) MainActions.getContact({dispatch})
        // eslint-disable-next-line
    }, [])

    return {contact, isLoading}
}

export default GetContact