const express = require("express");
const app = express();
require("dotenv").config();
const port = 3005;

const puppeteer = require("puppeteer");

app.listen(port, async () => {
  console.log("server running on", port);

  console.log("hit");
  const browser = await puppeteer.launch();
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

  await page.evaluate(() => {
    document.getElementById("selenium-insights").click();
  });

  await page.evaluate(() => {
    document.getElementById("selenium-reporting+").click();
  });
  await page.screenshot({ path: "./screenshots/shot1.png" });
  await page.waitFor(10000);
  await page.screenshot({ path: "./screenshots/shot.png" });
  await browser.close();
  console.log("browser shut down");
});
