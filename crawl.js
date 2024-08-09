import { JSDOM } from 'jsdom'

function normalizeURL(url) {
    const urlObj = new URL(url)
    let fullPath = `https://${urlObj.host}${urlObj.pathname}`
    if (fullPath.slice(-1) === '/') {
        fullPath = fullPath.slice(0, -1)
    }
    return fullPath
    
}

function getURLsFromHTML (htmlBody, baseURL){
    const dom = new JSDOM(htmlBody)
    const nodes = dom.window.document.querySelectorAll('a')
    const links = Array.from(nodes).map(link => link.getAttribute('href'))
    const fullLinks = links.map(link => {
        if (link[0] === '/') {      //This is a relative path
            return `${baseURL}${link}`
        } else {                    //its an absolute path
            return link
        }
    })
    return fullLinks
}

// DEPRECIATED but kept for reference
async function crawlPage(currentURL) {
    try {
        const response = await fetch(currentURL);
        
        // Checks the staus code
        if (!response.ok) {
          throw new Error(`Response status: ${response.status}`);
        }
        // Checks the content type to make sure we are getting html
        const contentType = response.headers.get("content-type");
        if (!contentType || !contentType.includes("text/html")) {
            throw new Error(`Expected HTML but received ${contentType}`);
        }
        // Parse the response to html string
        const html = await response.text();
        return html
      } catch (error) { // Catch all if anything goes wrong
        console.error(`LINE 50: ${error.message}`);
    }
}

async function fetchHTML(url) {
    // Try to fetch the page
    try {
        const response = await fetch(url);
        
        // Checks the staus code
        if (!response.ok) {
          throw new Error(`Response status: ${response.status}`);
        }
        // Checks the content type to make sure we are getting html
        const contentType = response.headers.get("content-type");
        if (!contentType || !contentType.includes("text/html")) {
            throw new Error(`Expected HTML but received ${contentType}`);
        }
        console.log(`Successfully fetched HTML from: ${url}`)
        return await response.text()

      } catch (error) {
        console.error(`Error crawling ${url}: ${error.message}`);
        return ''
    }
}

async function crawlPageR(baseURL, currentURL=baseURL, pages={}) {
    // currentURL is on the same domain as the baseURL. 
    // If it's not, just return the current pages.
    if (new URL(currentURL).host != new URL(baseURL).host) {
        return pages
    }

    
     // Normalized the currentURL.
     const normalizedURL = normalizeURL(currentURL)

     // Get the body of the HTML and find the URLs to crawl on it
    let htmlBody
    try {
       htmlBody = await fetchHTML(normalizedURL)
    } catch (error) {
       console.error(`fetchHTML has failed: ${error.message}`)
       return pages
    }


     // Either add to pages or increment count
     if (pages[normalizedURL]) {
        pages[normalizedURL]++
        return pages //return so we dont revisit pages
     }
     pages[normalizedURL] = 1

     
     
     const toCrawl = getURLsFromHTML(htmlBody, baseURL)
     console.log(`Pages to crawl from ${normalizedURL}: ${toCrawl}`)

    // Recursively crawl each URL you found on the page and update the pages to keep an aggregate count.
    for (const url of toCrawl) {
        console.log(`Now crawling ${url}`)
        pages = await crawlPageR(baseURL, url, pages)
    }
    
    // Finally, return the updated pages object.
    return pages
}

export { normalizeURL, getURLsFromHTML, crawlPageR }