function normalizeURL(url) {
    const urlObj = new URL(url)
    //remove trailing slash and convert to lowercase
    const urlPath = urlObj.pathname.replace(/\/$/, '').toLowerCase()
    
    return `${urlObj.host}${urlPath}`
}

export { normalizeURL }