const express = require("express");
const app = express();
const port = 3005;

const puppeteer = require("puppeteer");


app.listen(port,async  () => {
    console.log("server running on", port);
    

        console.log('hit')
        const browser=await puppeteer.launch()
        const page=await browser.newPage()
        await page.goto('https://podium.com')
        await page.screenshot({path: './screenshots/'});
        await browser.close()
        console.log('browser shut down')


});
