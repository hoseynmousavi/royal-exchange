import Resize from "./Resize"
import {useRef} from "react"

function SetFullViewPort()
{
    const {clientWidth, clientHeight} = Resize()
    const timer = useRef(null)

    clearTimeout(timer.current)
    timer.current = setTimeout(() =>
    {
        document.documentElement.style.setProperty(
            "--full-viewport",
            clientWidth > 450 ? "450px" : "100vw",
        )
        document.documentElement.style.setProperty(
            "--mobile-first-solid-padding",
            clientWidth > 450 ? "22.5px" : "5vw",
        )
        document.documentElement.style.setProperty(
            "--full-height",
            clientHeight + "px",
        )
    }, 10)
}

export default SetFullViewPort