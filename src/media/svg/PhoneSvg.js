function PhoneSvg({className})
{
    return (
        <svg className={className} viewBox="0 0 124.486 110.297">
            <defs>
                <linearGradient id="linear-gradient-phone" x1=".5" x2=".5" y2="1" gradientUnits="objectBoundingBox">
                    <stop offset="0" stopColor="#cf0b0f"/>
                    <stop offset="1" stopColor="#cf0b0f"/>
                </linearGradient>
                <linearGradient id="linear-gradient-2-phone" x1=".5" x2=".5" y2="1" gradientUnits="objectBoundingBox">
                    <stop offset="0" stopColor="#f6f7ff"/>
                    <stop offset="1" stopColor="#dadbf9"/>
                </linearGradient>
                <filter id="Rectangle_Copy_3" x="0" y="3.838" width="124.486" height="106.459" filterUnits="userSpaceOnUse">
                    <feOffset dy="12"/>
                    <feGaussianBlur stdDeviation="15" result="blur"/>
                    <feFlood floodColor="#142850" floodOpacity=".051"/>
                    <feComposite operator="in" in2="blur"/>
                    <feComposite in="SourceGraphic"/>
                </filter>
            </defs>
            <g transform="translate(-12.514)">
                <rect width="47.027" height="82.297" rx="8" transform="translate(34)" fill="url(#linear-gradient-phone)"/>
                <circle fill="url(#linear-gradient-2-phone)" cx="3.135" cy="3.135" r="3.135" transform="translate(54.378 73.676)"/>
                <rect fill="url(#linear-gradient-2-phone)" width="43.892" height="70.541" rx="6" transform="translate(35.568 1.568)"/>
                <g transform="translate(57.514 36.838)">
                    <g transform="translate(-45 -36.84)" filter="url(#Rectangle_Copy_3)">
                        <rect width="34.486" height="16.459" rx="4" transform="translate(45 36.84)" fill="#fff"/>
                    </g>
                </g>
            </g>
        </svg>
    )
}

export default PhoneSvg