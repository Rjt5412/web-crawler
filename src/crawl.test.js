const { test, expect } = require('@jest/globals')
const { normalizeURL, getURLsFROMHTML } = require('./crawl.js')
const { sort_pages } = require('./report.js')

test('normalizeURL generic', () => {
    const inputURL = 'https://factotums.com/movies'
    const result = normalizeURL(inputURL)
    const expected = 'factotums.com/movies'
    expect(result).toEqual(expected)
})

test('normalizeURL capitals', () => {
    const inputURL = 'https://FACTOTUMS.com/movies'
    const result = normalizeURL(inputURL)
    const expected = 'factotums.com/movies'
    expect(result).toEqual(expected)
})

test('normalizeURL slash', () => {
    const inputURL = 'https://factotums.com/movies/'
    const result = normalizeURL(inputURL)
    const expected = 'factotums.com/movies'
    expect(result).toEqual(expected)
})

test('getURLsFROMHTML absolute', () => {
    const baseURL = "https://factotums.com"
    const htmlString = '<html><body><a href="https://factotums.com"></body></html>'
    const result = getURLsFROMHTML(htmlString, baseURL)
    const expected = ["https://factotums.com/"]
    expect(result).toEqual(expected)
})

test('getURLsFROMHTML relative', () => {
    const baseURL = "https://factotums.com"
    const htmlString = '<html><body><a href="/movies"></body></html>'
    const result = getURLsFROMHTML(htmlString, baseURL)
    const expected = ["https://factotums.com/movies"]
    expect(result).toEqual(expected)
})

test('getURLsFROMHTML combined', () => {
    const baseURL = "https://factotums.com"
    const htmlString = '<html><body><a href="/movies"><a href="https://google.com/movie/reviews"></body></html>'
    const result = getURLsFROMHTML(htmlString, baseURL)
    const expected = ["https://factotums.com/movies", "https://google.com/movie/reviews"]
    expect(result).toEqual(expected)
})

test('sort_pages test', () => {
    const testPages = {
        "factotums.com/movies": 3,
        "factotums.com/books": 5,
        "factotums.com/games": 8,
        "factotums.com/travelling": 7,
    }

    const result = sort_pages(testPages)
    const expected = [
        ["factotums.com/games", 8],
        ["factotums.com/travelling", 7],
        ["factotums.com/books", 5],
        ["factotums.com/movies", 3],
    ]
    expect(result).toEqual(expected)

})