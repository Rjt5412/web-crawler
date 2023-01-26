const { JSDOM } = require('jsdom')

function normalizeURL(urlString){
    const urlObj = new URL(urlString)
    let fullPath = `${urlObj.host}${urlObj.pathname}`
    if (fullPath.length > 0 && fullPath.slice(-1) == "/"){  // Check and remove the trailing slash
        fullPath = fullPath.slice(0,-1)
    }
    return fullPath
}

function getURLsFROMHTML(htmlString, baseURL){
    const urls = []
    const dom = new JSDOM(htmlString)
    const aElements = dom.window.document.querySelectorAll('a')
    
    for (const aElement of aElements){
        if (aElement.href.slice(0,1) == "/"){ // Check and handle relative urls
            try{
                urls.push(new URL(aElement.href, baseURL).href)
            } catch (err){
                console.log(`${err.message}: ${aElement.href}`)
            }
        } else {
            try{
                urls.push(new URL(aElement.href).href)
            } catch (err){
                console.log(`${err.message}: ${aElement.href}`)
            }
        }
    }
    return urls
}


async function crawlPage(baseURL, currentURL, pages){
    
    // Checking if domains of currentURL and baseURL are some.
    // We dont want to crawl the entire internet
    currentURLObj = new URL(currentURL)
    baseURLObj = new URL(baseURL)
    if (currentURLObj.hostname !== baseURLObj.hostname){
        return pages
    }

    const normCurrentURL = normalizeURL(currentURL)
    if (normCurrentURL in pages){ // URL already crawled/traversed
        pages[normCurrentURL]++
        return pages
    } 
    pages[normCurrentURL] = 1

    //Page hasnt been crawled yet. So fetch the page
    console.log(`crawling ${normCurrentURL}`)
    let htmlString = ``
    try{
        const response = await fetch(`https://${normCurrentURL}`)
        if (response.status > 399){
            console.log(`HTTP Error. status code: ${response.status}`)
            return
        }
        const contentType = response.headers.get('content-type')
        if (!contentType.includes('text/html')){
            console.log(`Non HTML response: ${contentType}`)
            return pages
        }
        htmlString = await response.text()

    } catch (err){
        console.log(err.message)
    }

    const urls = getURLsFROMHTML(htmlString, baseURL)

    for (const url of urls){
        pages = await crawlPage(baseURL, url, pages)
    }

    return pages
}


module.exports = {
    normalizeURL, getURLsFROMHTML, crawlPage
  }