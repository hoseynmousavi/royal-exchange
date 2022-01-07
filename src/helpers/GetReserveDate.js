import MainActions from "../context/main/MainActions"
import {useEffect, useState} from "react"

function GetReserveTypes({IsBuy, ProductId, Quantity, selectedDay})
{
    const [days, setDays] = useState([])
    const [hours, setHours] = useState([])

    useEffect(() =>
    {
        if (IsBuy !== undefined && ProductId && Quantity)
        {
            MainActions.getReserveTime({IsBuy, ProductId, Quantity})
                .then(res =>
                {
                    const data = []
                    if (res?.data?.list?.length)
                    {
                        for (let i = 0; i < res.data.list.length; i++)
                        {
                            const item = res.data.list[i]
                            data.push({name: item.dateString, id: item.dateString, times: item.times})
                        }
                        setDays(data)
                    }
                })
        }
    }, [IsBuy, ProductId, Quantity])

    useEffect(() =>
    {
        if (days.filter(item => item.id === selectedDay)[0])
        {
            const data = []
            days.filter(item => item.id === selectedDay)[0].times
                .forEach(item =>
                {
                    data.push({name: item.timeString, id: item.dateTimeId})
                })
            setHours(data)
        }

    }, [selectedDay])

    return {days, hours}
}

export default GetReserveTypes