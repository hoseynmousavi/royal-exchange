function createQueryString({params})
{
    const str = Object.keys(params).reduce((sum, item) => params[item] ? `${sum}${item}=${params[item]}&` : sum, "?")
    return str.substr(0, str.length - 1)
}

export default createQueryString