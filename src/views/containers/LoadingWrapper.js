import MyLoader from "../components/MyLoader"

function LoadingWrapper()
{
    return (
        <div className="loading-wrapper">
            <MyLoader width={40}/>
        </div>
    )
}

export default LoadingWrapper