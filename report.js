function sortPages(pages) {
    // Convert the object into an array of key-value pairs
    const pagesArray = Object.entries(pages)

    // Sort the array based on the values
    pagesArray.sort((a, b) => b[1] - a[1])

    return pagesArray;
}

function printReport(pages) {
    // Prints a clean report of the pages data

    // Sort pages first
    const sortedPages = sortPages(pages)
    sortedPages.forEach(([url, count]) => {
        console.log(`Found ${count} internal links to ${url}`)
    })
}

export {printReport}