const cron = require('node-cron');
const puppeteer = require('puppeteer');
const cheerio = require('cheerio');
const nodemailer = require('nodemailer');

async function scrapelisting(page) {
  await page.goto('https://www.etuovi.com/myytavat-asunnot/tulokset?haku=M28373768&rd=50', {timeout: 0});
  const html = await page.content();
  const $ = cheerio.load(html);

  const listing = $('#announcement-list > div > div > div > div > div > a').map((index, element) => {
    //const titleelement = $(element).find('.MuiGrid-root.MuiGrid-item.MuiGrid-grid-xs-12.mui-style-1547ak > h5');
    const title = ""//null//$(titleelement).text();
    const url = ""//null//$(element).attr('href');
    console.log(title);
    return { title, url };
  }).get();

  return listing;
}

async function main() {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  const listing = await scrapelisting(page);

  listing.forEach(item => {
    console.log(`The title: ${item.title}, URL: ${item.url}`);
  });

  await browser.close();

  return listing;
}

cron.schedule('*/10 * * * * *', async function() {
  const listing = await main();

  if (!listing || listing.length === 0 || listing.some(item => !item.title || !item.url))  {
    console.log('Sending email...');

    const transporter = nodemailer.createTransport({
      
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: 'revtemp123@gmail.com',
        pass: 'vsdfabpoyvkwvqln'
      }
    });

    const message = {
      from: 'revtemp123@gmail.com',
      to: ['revathi.r@meltwater.com','revathir1610@gmail.com'],
      subject: 'Test Email',
      text: 'This is a test email message'
    };
    
    transporter.sendMail(message, (err, info) => {
      if (err) {
        console.error(err);
      } else {
        console.log(info);
      }
    });
  } else {
    console.log('Listing is not empty, not sending email.');
  }

  console.log('Running Cron Job');
});
