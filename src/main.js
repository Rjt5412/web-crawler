const { crawlPage } = require('./crawl.js')
const { printReport } = require('./report.js')

async function main(){
    if (process.argv.length < 3){
        console.log(`No website URL provided`)
    } else if (process.argv.length > 3){
        console.log(`Too many arguments provided.`)
    } else {
        const baseURL = process.argv[2]
        console.log(`Starting the web crawler from the URL:${baseURL}`)

        const pages = await crawlPage(baseURL, baseURL, {})

        printReport(pages)

    }
}

main()