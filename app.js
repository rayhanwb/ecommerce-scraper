const puppeteer = require('puppeteer');
const cheerio = require('cheerio');
const CronJob = require('cron').CronJob;
// const nodemailer = require('nodemailer');

const url =
  'https://www.tokopedia.com/keychron/keychron-q1-qmk-custom-mechanical-keyboard-fully-assembled-navy-blue-blue-switch';

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

  // cheerio('#price', html).each(function () {
  //   let harga = $(this).text();
  //   console.log(harga);
  // });

  const load = cheerio.load(html);
  const harga = load('.price').text().trim();

  console.log(harga);
}

async function monitor() {
  let page = await configureBrowser();
  await checkPrice(page);
}
monitor();
