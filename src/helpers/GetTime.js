import {useContext, useEffect} from "react"
import {MainContext} from "../context/main/MainReducer"
import MainActions from "../context/main/MainActions"

function GetTime()
{
    const {state: {time}, dispatch} = useContext(MainContext)
    const isLoading = !time.getDone

    useEffect(() =>
    {
        MainActions.getTime({dispatch})
    }, [])

    return {time, isLoading}
}

export default GetTime