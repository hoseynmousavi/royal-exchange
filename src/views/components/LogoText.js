import LogoSvg from "../../media/svg/LogoSvg"
import ImageShow from "./ImageShow"
import text from "../../media/images/logo-text.png"

function LogoText({className})
{
    return (
        <div className={className}>
            <LogoSvg className="logo-text-svg"/>
            <ImageShow className="logo-text-content" src={text} alt={process.env.REACT_APP_NAME}/>
        </div>
    )
}

export default LogoText
