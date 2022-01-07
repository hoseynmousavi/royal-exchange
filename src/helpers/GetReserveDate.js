import MainActions from "../context/main/MainActions"
import {useEffect, useState} from "react"

function GetReserveTypes({IsBuy, ProductId, Quantity})
{
    const [data, setData] = useState(null)

    useEffect(() =>
    {
        if (IsBuy !== undefined && ProductId && Quantity)
        {
            MainActions.getReserveTime({IsBuy, ProductId, Quantity})
                .then(res =>
                {
                    setData(res)
                })
        }
    }, [IsBuy, ProductId, Quantity])

    return {data: data?.data}
}

export default GetReserveTypes