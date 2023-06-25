const http = require('http');
const url = require('url');
const querystring = require('querystring');
const mongo = require("mongodb");
const Listing = require("./model/avoindataListing");
const mongoose = require('mongoose');
const server = http.createServer((req, res) => {
    if (req.url === '/') {
        // Serve the HTML file with the form
        res.setHeader('Content-Type', 'text/html');
        res.write('<html><head><title>Generate Link</title></head><body>');
        res.write('<form action="/generate-link" method="POST">');
        res.write('<label for="keyword">Keyword:</label>');
        res.write('<input type="text" id="keyword" name="keyword">');
        res.write('<button type="submit">Generate Link</button>');
        res.write('</form>');
        res.write('</body></html>');
        res.end();
    } else if (req.url === '/generate-link' && req.method === 'POST') {
        let body = '';
        req.on('data', chunk => {
            // Read the form data
            body += chunk.toString();
        });
        req.on('end', () => {
            const { keyword } = querystring.parse(body);
            let link;
            if (/^\d+$/.test(keyword)) {
                // Keyword is a number, generate link 1
                link = `https://avoindata.prh.fi/bis/v1?totalResults=true&maxResults=10&resultsFrom=0&businessId=${keyword}`;
            } else  {
                // Keyword is alphabetic, generate link 2
                link = `https://avoindata.prh.fi/bis/v1?totalResults=true&maxResults=10&resultsFrom=0&businessLine=${keyword}`;
            }
            // Display the generated link in the terminal
            console.log(`Generated link: ${link}`);
           async function connectToMongoDb()
                {
                await mongoose.connect(
                    "mongodb+srv://user:johnmayer@mfeeds.giicowq.mongodb.net/mfeeds_db?retryWrites=true&w=majority",
                    { useNewUrlParser: true }
                );
                console.log("connected")
                }
            //const myPosts = fetch(`${link}`);
              async function getData() {
                console.log(`${link}`)
                const myPosts = await fetch(`${link}`);
                const  response = await myPosts.json();
                console.log(response);
                var loc=new Array()
              const setting=[];
              for(var i = 1; i < 10; i++) {
             var url="http://www.kauppalehti.fi/yritykset/yritys/"+response["results"][i].name+"/"+response["results"][i].businessId;
             var url1=response[`results`][i].detailsUri
             var companyform=response["results"][i].companyForm;
             var registrationDate=response["results"][i].registrationDate;
             var name=response["results"][i].name;
             var buisnessId=response["results"][i].businessId;
             var loc={};
             loc['name']=name;
             loc['url1']=url1;
             loc['url']=url;
             loc['registrationDate']=registrationDate;
             loc['buisnessId']=buisnessId;
             loc['companyform']=companyform;
          setting.push({
            'Title':loc['name'],
            'Toimiala':loc['name'],
            'url1':loc['url1'],
            'url':loc['url'],
            'Rekisteröity':loc['registrationDate'],
            'buisnessId':loc['buisnessId'],
            'companyform':loc['companyform']
          });
              }
          console.log(setting);
          return setting;
        }
         async function scrapejobdescription(listing){
           for(var i=0; i< 9;i++)
            {
               const { MongoClient } = require('mongodb');
                const uri =`mongodb+srv://user:johnmayer@mfeeds.giicowq.mongodb.net/mfeeds_db?retryWrites=true&w=majority`;
                const client = new MongoClient(uri);
                    // Connect to the MongoDB cluster
                    await client.connect();
                    await findOneListingByName(client, listing[i].url);
                    async function findOneListingByName(client, nameOfListing) {
                        const cursor = await client.db("mfeeds_db").collection("avoindatalistings").find({ url: nameOfListing }).toArray()
                        if (cursor.length===0)
                        {
                            const con=listing[i].url1;
                            console.log(con);
                            const myPosts = await fetch(listing[i].url1);
                            const  response = await myPosts.json();
                            //var address1=response.results[0].addresses[0];
                            if (response.results[0].addresses[0] == null){
                                address="null"
                            }
                            else{
                            address = response.results[0].addresses[0].street + response.results[0].addresses[0].city + response.results[0].addresses[0].postCode ;
                            }// address= response["results"]["addresses"]//.postCode + response["results"]["addresses"].street+response["results"]["addresses"].city;
                            listing[i].address=address;
                            console.log(listing[i].address);
                            let ts = Date.now();
                            let date_time = new Date(ts);
                            let date = date_time.getDate();
                            let month = date_time.getMonth() + 1;
                            let year1 = date_time.getFullYear();
                            // prints date & time in YYYY-MM-DD format
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
                         // await sleep(1000);
                       }
                       else{
                        client.close();
                       }
                    // Make the appropriate DB calls
                      }
           }
          }
       /* async function sleep(milliseconds){
            return new Promise(resolve => setTimeout(resolve, milliseconds));
        }*/
 async function main()
{
    await connectToMongoDb();dr
    //const browser = await puppeteer.launch({headless: false});
    //const page = await browser.newPage();
    const listing = await getData();
    const jobdescription = await scrapejobdescription(listing);
    console.log(listing);
}
main();
            // Send the response to the browser
            res.writeHead(302, { Location: link });
            res.end();
        });
    } else {
        // Invalid URL
        res.statusCode = 404;
        res.end();
    }
});
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});