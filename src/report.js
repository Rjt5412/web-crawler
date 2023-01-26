function sort_pages(pages){
    // Sort the object entries based on value counts and return a 2d array with 
    // each element as an array of format [key, value]
    const sorted_pages = Object.entries(pages).sort(([,a],[,b]) => b-a)
    return sorted_pages
}

function printReport(pages){
    console.log(`***********************************************`)
    console.log('CRAWLER REPORT')
    console.log(`***********************************************`)

    const sorted_pages = sort_pages(pages)

    for (const page of sorted_pages){
        console.log(`Found ${page[1]} internal links to URL => ${page[0]}`)
    }

    console.log(`***********************************************`)
    console.log(`***********************************************`)
}

module.exports = {
    sort_pages, printReport
}