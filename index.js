const express = require("express");
const app = express();
require("dotenv").config();
const port = 3005;

const puppeteer = require("puppeteer");

app.listen(port, async () => {
  console.log("server running on", port);

  console.log("hit");
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null
  });
  const page = await browser.newPage();
  await page.goto("https://auth.podium.com", { waitUntil: "networkidle2" });
  await page.evaluate(() => {
    document.getElementById("emailOrPhoneInput").click();
  });
  await page.keyboard.type(process.env.EMAIL);
  await page.evaluate(() => {
    document.getElementById("signInButton").click();
  });
  await page.waitFor(2000);
  await page.evaluate(() => {
    document.getElementById("passwordInput");
  });
  await page.keyboard.type(process.env.PASS);
  await page.evaluate(() => {
    document.getElementById("signInButton").click();
  });

  await page.waitForSelector("#selenium-insights");

  await page.screenshot({ path: "./screenshots/shot1.png" });

  // await page.evaluate(() => {
  //   document.getElementById("selenium-insights").click();
  // });

  // await page.evaluate(() => {
  //   document.getElementById("selenium-reporting+").click();
  // });

  await page.goto(
    "https://insights.podium.com/reporting-plus?location_id=54673",
    { waitUntil: "networkidle2" }
  );
  // text: "NPS Export (Based on Service Date)"
  await page.waitFor(10000);
  await page.screenshot({ path: "./screenshots/shot.png" });
  // let frames=await page.frames()
  // let correctFrame=frames.find(frame=>{
  //   frame.id==='#domo-reporting-content'
  // })

  // console.log(correctFrame, 'correct!')

  await page.goto(
    "https://podium-ss.domo.com/page/ss:149:797560795/kpis/details/678494653",
    { waitUntil: "networkidle2" }
  );

  await page.waitForSelector('i.icon-wrench')
  await page.evaluate( async () => {
    await document.querySelector('i.icon-wrench').click()

    await document.querySelectorAll('div.db-text-body.label')[1].click()
    await document.getElementById('export-csv').click()

  });
  // await browser.close();
  console.log("browser shut down");
});
