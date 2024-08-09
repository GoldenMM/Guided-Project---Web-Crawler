import { crawlPageR } from "./crawl.js"
import { printReport } from "./report.js"

// https://wagslane.dev   USING FOR TESTING PURPOSES

async function main() {
    const args = process.argv
    if (args.length < 3) { // No arguments given
        throw new Error('Requires at least 1 argument')
        return
    } else if (args.length > 3) { // More than 1 argument given
        throw new Error('Requires only 1 argument')
        return
    } else { // Exactly 1 argument is given
        const baseURL = process.argv[2]
        console.log(`Crawler starting at ${baseURL}`)
        const pages = await crawlPageR(baseURL)
        printReport(pages)
    }
}

main()

  
  