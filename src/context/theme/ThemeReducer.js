import {createContext, useEffect, useReducer} from "react"
import {TOGGLE_THEME} from "./ThemeTypes"
import loadColors from "../../helpers/loadColors"
import themeManager from "../../helpers/themeManager"
import SetFullViewPort from "../../helpers/SetFullViewPort"

export const ThemeContext = createContext(null)

const initialState = {
    theme: "light",
}

const init = () => initialState

function reducer(state, action)
{
    switch (action.type)
    {
        case TOGGLE_THEME:
        {
            const {theme} = action.payload
            localStorage.setItem("theme", theme === "dark" ? "dark" : "light")
            return {
                ...state,
                theme,
            }
        }
        default:
        {
            throw new Error()
        }
    }
}

function ThemeProvider({children})
{
    const [state, dispatch] = useReducer(reducer, initialState, init)
    SetFullViewPort()

    useEffect(() =>
    {
        if (process.env.NODE_ENV === "development") loadColors()
        themeManager.configTheme()
    }, [])

    return (
        <ThemeContext.Provider value={{state, dispatch}}>
            {children}
        </ThemeContext.Provider>
    )
}

export default ThemeProvider