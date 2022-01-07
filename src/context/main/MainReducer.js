import {createContext, useEffect, useReducer} from "react"
import logoutManager from "../../helpers/logoutManager"
import {PIN_PRICE, SET_CONTACT, SET_PRICES, SET_RESERVE_TYPE, SET_TIME, UNPIN_PRICE} from "./MainTypes"
import {LOGOUT} from "../auth/AuthTypes"

export const MainContext = createContext(null)

const initialState = {
    time: {},
    prices: {},
    contact: {},
    reserve: {
        productTypes: {},
    },
}

const init = () => initialState

function reducer(state, action)
{
    switch (action.type)
    {
        case SET_TIME:
        {
            const {res} = action.payload
            return {
                ...state,
                time: {
                    ...state.time,
                    ...res.data,
                    getDone: true,
                },
            }
        }
        case SET_PRICES:
        {
            const {res: {data}} = action.payload
            return {
                ...state,
                prices: {
                    ...state.prices,
                    ...data,
                    getDone: true,
                },
            }
        }
        case PIN_PRICE:
        {
            const {productId, selectedTab} = action.payload
            const data = [...state.prices[selectedTab === "currency" ? "currencies" : "golds"]]
            const pinnedItem = data[data.findIndex(item => item.productId === productId)]
            pinnedItem.isPin = true
            const pins = [...state.prices.pins, pinnedItem]
            return {
                ...state,
                prices: {
                    ...state.prices,
                    pins,
                },
            }
        }
        case UNPIN_PRICE:
        {
            const {productId, selectedTab} = action.payload
            const data = [...state.prices[selectedTab === "currency" ? "currencies" : "golds"]]
            const pinnedItem = data[data.findIndex(item => item.productId === productId)]
            pinnedItem.isPin = false
            const pins = [...state.prices.pins].filter(item => item.productId !== pinnedItem.productId)
            return {
                ...state,
                prices: {
                    ...state.prices,
                    pins,
                },
            }
        }
        case SET_CONTACT:
        {
            const {res: {data}} = action.payload
            return {
                ...state,
                contact: {
                    ...state.contact,
                    ...data,
                    getDone: true,
                },
            }
        }
        case SET_RESERVE_TYPE:
        {
            const {res: {data}} = action.payload
            return {
                ...state,
                reserve: {
                    ...state.reserve,
                    productTypes: {
                        ...state.reserve.productTypes,
                        data,
                        getDone: true,
                    },
                },
            }
        }
        case LOGOUT:
        {
            return init()
        }
        default:
        {
            throw new Error()
        }
    }
}

function MainProvider({children})
{
    const [state, dispatch] = useReducer(reducer, initialState, init)

    useEffect(() =>
    {
        logoutManager.setLogOut({callBack: () => dispatch({type: LOGOUT})})
    }, [])

    return (
        <MainContext.Provider value={{state, dispatch}}>
            {children}
        </MainContext.Provider>
    )
}

export default MainProvider