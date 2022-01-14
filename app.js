const puppeteer = require('puppeteer');
const cheerio = require('cheerio');
const CronJob = require('cron').CronJob;
const express = require('express');
const app = express();
const port = 3000;
// const nodemailer = require('nodemailer');

const url =
  'https://www.tokopedia.com/search?condition=2&ob=9&st=product&q=keycaps';

async function configureBrowser() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  page.setUserAgent(
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4182.0 Safari/537.36'
  ); //Bypass server blocker

  await page.goto(url);
  return page;
}

async function checkPrice(page) {
  await page.reload();
  let html = await page.evaluate(() => document.body.innerHTML);

  const load = cheerio.load(html);
  const title = load('.css-12fc2sy').text().trim();

  app.get('/', (req, res) => {
    res.send(title);
  });

  app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`);
  });
}

async function monitor() {
  let page = await configureBrowser();
  await checkPrice(page);
}
monitor();
