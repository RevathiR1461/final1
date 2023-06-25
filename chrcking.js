const cron = require("node-cron");
const puppeteer = require('puppeteer');
const cheerio = require("cheerio");
const http = require('http');
const mongo = require("mongodb");
const Listing = require("./model/torietuoviListing.js");
const mongoose = require('mongoose');



async function connectToMongoDb()
{
  await mongoose.connect(
    "mongodb+srv://user:johnmayer@mfeeds.giicowq.mongodb.net/mfeeds_db?retryWrites=true&w=majority",
    { useNewUrlParser: true }
  );
  console.log("connected")
}

async function scrapelisting(page) {
await page.goto('https://www.etuovi.com/myytavat-tontit/tulokset?haku=M1075597570&rd=10', {timeout: 0});
const html = await page.content();
    const $ = cheerio.load(html);
    /* const example = await page.$('#km-ccw > div > div.consent-buttons > button.consent-buttons__yes');

await example.click({
  button: 'left',
}); */


const listing = $("#announcement-list > div.MuiGrid-root.MuiGrid-container.e1wmqowa1.mui-style-sjvcny > div.MuiGrid-root.MuiGrid-item.MuiGrid-grid-xs-12.MuiGrid-grid-md-true.e1wmqowa0.mui-style-kp8qra > div.MuiGrid-root.MuiGrid-container.ListPage__items__3n9Bd.mui-style-1d3bbye > div > div > a").map((index, element) => {
    const titleelement= $(element).find(" div > div.MuiGrid-root.MuiGrid-item.MuiGrid-grid-xs-12.MuiGrid-grid-sm-6.MuiGrid-grid-md-6.MuiGrid-grid-lg-8.e12nd9f39.mui-style-1ogyoh1 > div > div.MuiGrid-root.MuiGrid-container.e12nd9f38.mui-style-17l37w9 > div.MuiGrid-root.MuiGrid-item.MuiGrid-grid-xs-12.mui-style-1547ak > h4");                                     
     const title = $(titleelement).text();
     const url = $(element).attr("href"); 
    console.log(url)
          return{title,url}                                                                                                                                                                                                                                                                                
        })

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       
 
.get();


return listing;
}
async function scrapejobdescription(listing, page){
    for(var i=0; i< 2;i++)
    {
      const { MongoClient } = require('mongodb');
      const uri =`mongodb+srv://user:johnmayer@mfeeds.giicowq.mongodb.net/mfeeds_db?retryWrites=true&w=majority`;
      const client = new MongoClient(uri);
    
      
      // Connect to the MongoDB cluster
      await client.connect();
      await findOneListingByName(client, listing[i].url);
      async function findOneListingByName(client, nameOfListing) {
          const cursor = await client.db("mfeeds_db").collection("torietuovilistings").find({ url: nameOfListing }).toArray()
        
          if (cursor.length===0){
      
        await page.goto("https://www.etuovi.com"+listing[i].url);
        
        
        const url1=listing[i].url;
        //console.log(listing[i].url);
        const html= await page.content();
        const $  = cheerio.load(html);
         if (url1.match(/\/\w{1}\d{5}\?/)){
       
        const id=$("#showings > div:nth-child(5) > div:nth-child(2) > div > div > div > div > div > div:nth-child(2) > div.flexboxgrid__col-xs-12__1I1LS.flexboxgrid__col-sm-8__2jfMv.CompactInfoRow__content__3jGt4 > span").text();
        const addinfo=$("#showings > div:nth-child(4) > div:nth-child(2) > div > div > div > div > div.flexboxgrid__col-xs-12__1I1LS.flexboxgrid__col-sm-12__3lVf6.flexboxgrid__col-md-8__161oS.flexboxgrid__col-lg-8__2H2vd > div > div.flexboxgrid__col-xs-12__1I1LS.flexboxgrid__col-sm-8__2jfMv.CompactInfoRow__content__3jGt4").text();
        const description=$("#infos > div > div:nth-child(2) > div:nth-child(2) > div > p").text();
        const area=$("#infos > div > div.flexboxgrid__col-xs-12__1I1LS.ItemSummaryContainer__itemTitleContainer__cDLuQ > div > div:nth-child(2) > div > div.flexboxgrid__col-xs-6__2c5DO.flexboxgrid__col-sm-3__28H0F.flexboxgrid__col-md-4__2DYW- > h3 > span").text();
        const address=$("#infos > div > div.flexboxgrid__col-xs-12__1I1LS.ItemSummaryContainer__itemTitleContainer__cDLuQ > div > div.flexboxgrid__col-xs-12__1I1LS.flexboxgrid__col-md-6__1n8OT.ItemSummaryContainer__alignLeft__2IE5Z > h1").text();
        const building=$("#showings > div:nth-child(5) > div:nth-child(2) > div > div > div > div > div > div:nth-child(5) > div.flexboxgrid__col-xs-12__1I1LS.flexboxgrid__col-sm-8__2jfMv.CompactInfoRow__content__3jGt4 > span").text();
        const Zoning=$("#showings > div:nth-child(5) > div:nth-child(2) > div > div > div > div > div > div:nth-child(7) > div.flexboxgrid__col-xs-12__1I1LS.flexboxgrid__col-sm-8__2jfMv.CompactInfoRow__content__3jGt4").text();
        const type=$("#showings > div:nth-child(2) > div:nth-child(2) > div > div > div > div > div.flexboxgrid__col-xs-12__1I1LS.flexboxgrid__col-sm-12__3lVf6.flexboxgrid__col-md-8__161oS.flexboxgrid__col-lg-8__2H2vd > div:nth-child(3) > div.flexboxgrid__col-xs-12__1I1LS.flexboxgrid__col-sm-8__2jfMv.CompactInfoRow__content__3jGt4 > a").text();
        
 
       const vendor=$("#contact > div.MuiGrid-root.MuiGrid-container.e1j97vdy5.mui-style-1uy4edm > div.MuiGrid-root.MuiGrid-item.MuiGrid-grid-xs-12.mui-style-1547ak > div > div.MuiGrid-root.MuiGrid-item.MuiGrid-grid-xs-12.MuiGrid-grid-sm-6.mui-style-18394z3 > div > div.MuiGrid-root.MuiGrid-item.MuiGrid-grid-xs-12.e1j97vdy3.mui-style-bwhq8t > div.MuiGrid-root.MuiGrid-container.mui-style-1i8dzhp > div").text();
       
       
        
      
    

  // retrieve the value from the corresponding element
  
       listing[i].building=building;
        listing[i].id=id;
        listing[i].addinfo=addinfo;
        listing[i].Zoning=Zoning;
        listing[i].address=address;
        listing[i].area=area;
        listing[i].description=description;
        listing[i].type=type; 
        listing[i].vendor=vendor;
        
            
        } 

        const vendor=new Array()
         if (url1.match(/\/\d{6}\?/)){
        const id=$("#showings > div:nth-child(4) > div:nth-child(2) > div > div > div > div > div > div:nth-child(2) > div.flexboxgrid__col-xs-12__1I1LS.flexboxgrid__col-sm-8__2jfMv.CompactInfoRow__content__3jGt4 > span").text();
        const addinfo=$("#showings > div:nth-child(4) > div:nth-child(2) > div > div > div > div > div.flexboxgrid__col-xs-12__1I1LS.flexboxgrid__col-sm-12__3lVf6.flexboxgrid__col-md-8__161oS.flexboxgrid__col-lg-8__2H2vd > div > div.flexboxgrid__col-xs-12__1I1LS.flexboxgrid__col-sm-8__2jfMv.CompactInfoRow__content__3jGt4").text();
        const description=$("#infos > div > div:nth-child(2) > div:nth-child(2) > div > p").text();
        const area=$("#infos > div > div.flexboxgrid__col-xs-12__1I1LS.ItemSummaryContainer__itemTitleContainer__cDLuQ > div > div:nth-child(2) > div > div.flexboxgrid__col-xs-6__2c5DO.flexboxgrid__col-sm-3__28H0F.flexboxgrid__col-md-4__2DYW- > h3 > span").text();
        const address=$("#infos > div > div.flexboxgrid__col-xs-12__1I1LS.ItemSummaryContainer__itemTitleContainer__cDLuQ > div > div.flexboxgrid__col-xs-12__1I1LS.flexboxgrid__col-md-6__1n8OT.ItemSummaryContainer__alignLeft__2IE5Z > h1").text();
        const building=$("#showings > div:nth-child(4) > div:nth-child(2) > div > div > div > div > div > div:nth-child(6) > div.flexboxgrid__col-xs-12__1I1LS.flexboxgrid__col-sm-8__2jfMv.CompactInfoRow__content__3jGt4 > span").text();
        const Zoning=$("#showings > div:nth-child(4) > div:nth-child(2) > div > div > div > div > div > div:nth-child(7) > div.flexboxgrid__col-xs-12__1I1LS.flexboxgrid__col-sm-8__2jfMv.CompactInfoRow__content__3jGt4").text();
        const type=$("#showings > div:nth-child(2) > div:nth-child(2) > div > div > div > div > div.flexboxgrid__col-xs-12__1I1LS.flexboxgrid__col-sm-12__3lVf6.flexboxgrid__col-md-8__161oS.flexboxgrid__col-lg-8__2H2vd > div:nth-child(3) > div.flexboxgrid__col-xs-12__1I1LS.flexboxgrid__col-sm-8__2jfMv.CompactInfoRow__content__3jGt4").text();
        //const vendor=$("#contact > div.MuiGrid-root.MuiGrid-container.brand.e1j97vdy5.mui-style-1uy4edm > div.MuiGrid-root.MuiGrid-item.MuiGrid-grid-xs-12.mui-style-1547ak > div > div.MuiGrid-root.MuiGrid-item.MuiGrid-grid-xs-12.MuiGrid-grid-sm-6.mui-style-18394z3 > div > div.MuiGrid-root.MuiGrid-item.MuiGrid-grid-xs-12.e1j97vdy3.mui-style-bwhq8t > div.MuiGrid-root.MuiGrid-container.mui-style-1i8dzhp > div").text();
        const vendor=$("#contact > div.MuiGrid-root.MuiGrid-container.brand.e1j97vdy5.mui-style-1uy4edm > div.MuiGrid-root.MuiGrid-item.MuiGrid-grid-xs-12.mui-style-1547ak > div > div.MuiGrid-root.MuiGrid-item.MuiGrid-grid-xs-12.MuiGrid-grid-sm-6.mui-style-18394z3 > div > div.MuiGrid-root.MuiGrid-item.MuiGrid-grid-xs-12.e1j97vdy3.mui-style-bwhq8t > div.MuiGrid-root.MuiGrid-container.mui-style-1i8dzhp > div").text();
        listing[i].building=building;
        listing[i].id=id;
        listing[i].addinfo=addinfo;
        listing[i].Zoning=Zoning;
        listing[i].address=address;
        listing[i].area=area;
        listing[i].description=description;
        listing[i].type=type;
        listing[i].vendor=vendor;

        } 
         if (url1.match(/\/\d{7}\?/)){
        
        const id=$("#showings > div:nth-child(4) > div:nth-child(2) > div > div > div > div > div > div:nth-child(2) > div.flexboxgrid__col-xs-12__1I1LS.flexboxgrid__col-sm-8__2jfMv.CompactInfoRow__content__3jGt4 > span > font > font").text();
        const addinfo=$("#showings > div:nth-child(4) > div:nth-child(2) > div > div > div > div > div.flexboxgrid__col-xs-12__1I1LS.flexboxgrid__col-sm-12__3lVf6.flexboxgrid__col-md-8__161oS.flexboxgrid__col-lg-8__2H2vd").text();
        const description=$("#infos > div > div:nth-child(2) > div:nth-child(2) > div > p").text();
        const area=$("#infos > div > div.flexboxgrid__col-xs-12__1I1LS.ItemSummaryContainer__itemTitleContainer__cDLuQ > div > div:nth-child(2) > div > div.flexboxgrid__col-xs-6__2c5DO.flexboxgrid__col-sm-3__28H0F.flexboxgrid__col-md-4__2DYW- > h3 > span").text();
        const address=$("#infos > div > div.flexboxgrid__col-xs-12__1I1LS.ItemSummaryContainer__itemTitleContainer__cDLuQ > div > div.flexboxgrid__col-xs-12__1I1LS.flexboxgrid__col-md-6__1n8OT.ItemSummaryContainer__alignLeft__2IE5Z > h1").text();
        const building=$("#showings > div:nth-child(4) > div:nth-child(2) > div > div > div > div > div > div:nth-child(4) > div.flexboxgrid__col-xs-12__1I1LS.flexboxgrid__col-sm-8__2jfMv.CompactInfoRow__content__3jGt4 > span").text();
        const Zoning=$("#showings > div:nth-child(4) > div:nth-child(2) > div > div > div > div > div > div:nth-child(6) > div.flexboxgrid__col-xs-12__1I1LS.flexboxgrid__col-sm-8__2jfMv.CompactInfoRow__content__3jGt4 > span").text();
        const type=$("#infos > div > div.flexboxgrid__col-xs-12__1I1LS.ItemSummaryContainer__itemTitleContainer__cDLuQ > div > div.flexboxgrid__col-xs-12__1I1LS.flexboxgrid__col-md-6__1n8OT.ItemSummaryContainer__alignLeft__2IE5Z > h2").text();
        const vendor=$("#contact > div.MuiGrid-root.MuiGrid-container.brand.e1j97vdy5.mui-style-1uy4edm > div.MuiGrid-root.MuiGrid-item.MuiGrid-grid-xs-12.mui-style-1547ak > div > div.MuiGrid-root.MuiGrid-item.MuiGrid-grid-xs-12.MuiGrid-grid-sm-6.mui-style-18394z3 > div").text();
        
        listing[i].building=building;
        listing[i].id=id;
        listing[i].addinfo=addinfo;
        listing[i].Zoning=Zoning;
        listing[i].address=address;
        listing[i].area=area;
        listing[i].description=description;
        listing[i].type=type;
        listing[i].vendor=vendor;
        }  
         if(url1.match(/\/\d{8}\?/)){
        const id=$("#showings > div:nth-child(5) > div:nth-child(2) > div > div > div > div > div > div:nth-child(2) > div.flexboxgrid__col-xs-12__1I1LS.flexboxgrid__col-sm-8__2jfMv.CompactInfoRow__content__3jGt4 > span").text();
        
        const addinfo=$("#showings > div:nth-child(4) > div:nth-child(2) > div > div > div > div > div.flexboxgrid__col-xs-12__1I1LS.flexboxgrid__col-sm-12__3lVf6.flexboxgrid__col-md-8__161oS.flexboxgrid__col-lg-8__2H2vd").text();
        const description=$("#infos > div > div:nth-child(2) > div:nth-child(2) > div > p").text();
        const area=$("#showings > div:nth-child(5) > div:nth-child(2) > div > div > div > div > div > div:nth-child(7) > div.flexboxgrid__col-xs-12__1I1LS.flexboxgrid__col-sm-8__2jfMv.CompactInfoRow__content__3jGt4 > span").text();
        const address=$("#infos > div > div.flexboxgrid__col-xs-12__1I1LS.ItemSummaryContainer__itemTitleContainer__cDLuQ > div > div.flexboxgrid__col-xs-12__1I1LS.flexboxgrid__col-md-6__1n8OT.ItemSummaryContainer__alignLeft__2IE5Z > h1").text();
        const building=$("#showings > div:nth-child(5) > div:nth-child(2) > div > div > div > div > div > div:nth-child(8) > div.flexboxgrid__col-xs-12__1I1LS.flexboxgrid__col-sm-8__2jfMv.CompactInfoRow__content__3jGt4 > span").text();
        const Zoning=$("#showings > div:nth-child(5) > div:nth-child(2) > div > div > div > div > div > div:nth-child(10) > div.flexboxgrid__col-xs-12__1I1LS.flexboxgrid__col-sm-8__2jfMv.CompactInfoRow__content__3jGt4 > span").text();
        const type=$("#showings > div:nth-child(2) > div:nth-child(2) > div > div > div > div > div.flexboxgrid__col-xs-12__1I1LS.flexboxgrid__col-sm-12__3lVf6.flexboxgrid__col-md-8__161oS.flexboxgrid__col-lg-8__2H2vd > div:nth-child(3) > div.flexboxgrid__col-xs-12__1I1LS.flexboxgrid__col-sm-8__2jfMv.CompactInfoRow__content__3jGt4 > a").text();
        const vendor=$("#contact > div.MuiGrid-root.MuiGrid-container.brand.e1j97vdy5.mui-style-1uy4edm > div.MuiGrid-root.MuiGrid-item.MuiGrid-grid-xs-12.mui-style-1547ak > div > div.MuiGrid-root.MuiGrid-item.MuiGrid-grid-xs-12.MuiGrid-grid-sm-6.mui-style-18394z3 > div > div.MuiGrid-root.MuiGrid-item.MuiGrid-grid-xs-12.e1j97vdy3.mui-style-bwhq8t > div.MuiGrid-root.MuiGrid-container.mui-style-1i8dzhp > div").text();
       
        listing[i].building=building;
        listing[i].id=id;
        listing[i].addinfo=addinfo;
        listing[i].Zoning=Zoning;
        listing[i].address=address;
        listing[i].area=area;
        listing[i].description=description;
        listing[i].type=type; 
        listing[i].vendor=vendor;  
            
        }
        console.log(listing[i].building);
        console.log(listing[i].id)
        console.log(listing[i].addinfo);
        console.log(listing[i].Zoning);
        console.log(listing[i].address);
        console.log(listing[i].area);
        console.log(listing[i].description);
        console.log(listing[i].type);
        console.log(listing[i].vendor);
        console.log(listing[i].ven1);
        let ts = Date.now();

        let date_time = new Date(ts);
        let date = date_time.getDate();
        let month = date_time.getMonth() + 1;
        let year1 = date_time.getFullYear();

        let v = year1 + "-" + month + "-" + date;
        listing[i].date = v;
        console.log(listing[i].date);

        let hours = date_time.getHours();
        let minutes = date_time.getMinutes();
        let seconds = date_time.getSeconds();

        let y = hours + ":" + minutes + ":" + seconds;
        listing[i].time = y;
        console.log(listing[i].time);
       const listingModel = new Listing(listing[i])
        await listingModel.save();
        await sleep(3000);
      }
      else{
        client.close();
  
       }
    
      
      }

      }   
  }
  
async function sleep(milliseconds){
return new Promise(resolve => setTimeout(resolve, milliseconds));
} 

async function main()
{
await connectToMongoDb();
const browser = await puppeteer.launch({headless: false});
const page = await browser.newPage();
const listing = await scrapelisting(page);
const datadescription = await scrapejobdescription(listing, page);
console.log(listing);
}

main();
//cron.schedule("*/10 * * * * *", function() {
   // main();
    //console.log('Running Cron Job');

//});
//const addinfo=add.replace(/\s+/g, ''); 
//const description=descrip.replace(/\s+/g, '');
//const vendor=$("#contact > div.MuiGrid-root.MuiGrid-container.e1j97vdy5.mui-style-1uy4edm > div.MuiGrid-root.MuiGrid-item.MuiGrid-grid-xs-12.mui-style-1547ak > div > div.MuiGrid-root.MuiGrid-item.MuiGrid-grid-xs-12.MuiGrid-grid-sm-6.mui-style-18394z3 > div > div.MuiGrid-root.MuiGrid-item.MuiGrid-grid-xs-12.e1j97vdy3.mui-style-bwhq8t > div > div > div  
