import {useContext, useEffect} from "react"
import {MainContext} from "../context/main/MainReducer"
import MainActions from "../context/main/MainActions"

function GetPrices()
{
    const {state: {prices}, dispatch} = useContext(MainContext)
    const isLoading = !prices.getDone

    useEffect(() =>
    {
        if (isLoading) MainActions.getPrices({dispatch})
        // eslint-disable-next-line
    }, [])

    return {prices, isLoading}
}

export default GetPrices