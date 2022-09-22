import {MainContext} from "../context/main/MainReducer"
import MainActions from "../context/main/MainActions"
import {useContext, useEffect} from "react"

function GetReserveTypes()
{
    const {state: {reserve: {productTypes}}, dispatch} = useContext(MainContext)
    const isLoading = !productTypes.getDone

    useEffect(() =>
    {
        if (isLoading) MainActions.getProductReserveTypes({dispatch})
        // eslint-disable-next-line
    }, [])

    return {productTypes, isLoading}
}

export default GetReserveTypes