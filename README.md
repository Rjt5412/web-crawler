# Web Crawler

A simple web crawler written in Javascript using Node.js

## Installation/Run steps

1. Download Node version 18.7.0
2. Clone the repository and do an `npm install` to install project dependencies.
3. To run the crawler, run the command: `npm run start <website URL>`.

## Extension Ideas

- Make the script run on a timer and deploy it to a server. Have it email you every so often with a report.
- Add more robust error checking so that you can crawl larger sites without issues.
- Count external links, as well as internal links, and add them to the report
- Save the report as a CSV spreadsheet rather than printing it to the console
- Use a graphics library to create an image that shows the links between the pages as a graph visualization
- Make requests concurrently to speed up the crawling process
