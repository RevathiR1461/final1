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
            let url1;
            if (/^[a-zA-Z]+$/.test(keyword)) {
              link = `https://avoindata.prh.fi/bis/v1?totalResults=true&maxResults=10&resultsFrom=0&businessLine=${keyword}`;
                connectToMongoDb();
                const listing =  getData();
                const jobdescription = scrapejobdescription(listing);
                console.log(listing);

                } 
            else 
               {
                   // Keyword is a number, generate link 1
                           url1 = `https://avoindata.prh.fi/bis/v1?totalResults=true&maxResults=10&resultsFrom=0&businessId=${keyword}`;
                           connectToMongoDb();
                           jobdescription1()
                // Keyword is alphabetic, generate link 2
                
                }


              async function jobdescription1(){
                
                  
                    const con=`${url1}`;
                    console.log(con);
                    const myPosts = await fetch(url1);
                    const  response = await myPosts.json();
                    //var address1=response.results[0].addresses[0];
                    var companyform=response["results"][0].companyForm;
                    var registrationDate=response["results"][0].registrationDate;
                    var name=response["results"][0].name;
                    if (response.results[0].addresses[0] == null){
                        address="null"
                    }
                    else{
                    address = response.results[0].addresses[0].street + response.results[0].addresses[0].city + response.results[0].addresses[0].postCode ;
                    }// address= response["results"]["addresses"]//.postCode + response["results"]["addresses"].street+response["results"]["addresses"].city;
                    address=address;
                    var url="http://www.kauppalehti.fi/yritykset/yritys/"+response["results"][0].name+"/"+response["results"][0].businessId;
                    //console.log(address);
                    let ts = Date.now();
                    let date_time = new Date(ts);
                    let date = date_time.getDate();
                    let month = date_time.getMonth() + 1;
                    let year1 = date_time.getFullYear();
                    // prints date & time in YYYY-MM-DD format
                    let v = year1 + "-" + month + "-" + date;
                    date = v;
                    //console.log(date);
                    let hours = date_time.getHours();
                    let minutes = date_time.getMinutes();
                    let seconds = date_time.getSeconds();
                    let y = hours + ":" + minutes + ":" + seconds;
                    time = y;
                    var loc={};
                    const setting=[];
                    //console.log(time);
                    loc['name']=name;
                    loc['address']=address;
                    loc['date']=date;
                    loc['registrationDate']=registrationDate;
                    loc['time']=time;
                    loc['companyform']=companyform;
                    setting.push({
                   'Title':loc['name'],
                   'Toimiala':loc['name'],
                   'address':loc['address'],
                   'date':loc['date'],
                   'time':loc['time'],
                   'Rekisteröity':loc['registrationDate'],
                   //'buisnessId':loc['buisnessId'],
                   'companyform':loc['companyform']
                   });
                   console.log(setting);
                   const { MongoClient } = require('mongodb');
                const uri =`mongodb+srv://user:johnmayer@mfeeds.giicowq.mongodb.net/mfeeds_db?retryWrites=true&w=majority`;
                const client = new MongoClient(uri);
                    // Connect to the MongoDB cluster
                    await client.connect();
                    // await findOneListingByName(client, listing[i].url1);
                    //if (listing[i] && listing[i].url1) {
                      await findOneListingByName(client, url);
                    //}
                    async function findOneListingByName(client, nameOfListing) {
                        const cursor = await client.db("mfeeds_db").collection("avoindatalistings").find({ url: nameOfListing }).toArray()
                        if (cursor.length===0)
                        {
                          const listingModel = new Listing(setting);
                          await listingModel.save();
                      // await sleep(1000);
                    }
                    else{
                     client.close();
                    }
                 //console.log(setting);
                 
                }
              }
                
                
            // Display the generated link in the terminal
            //console.log(`Generated link: ${link}`);
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
                    // await findOneListingByName(client, listing[i].url1);
                    if (listing[i] && listing[i].url1) {
                      await findOneListingByName(client, listing[i].url);
                    }
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
        if (url1) {
          res.setHeader('Location', url1);
          res.statusCode = 302;
          res.end();
        } else {
          res.setHeader('Location', link);
          res.statusCode = 302;
          res.end();
          //res.writeHead(302, { Location: link });
          //res.end();
        }
        
            // Send the response to the browser
           
        });
    } else {
        // Invalid URL
        res.statusCode = 404;
        res.end();
    }
});
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});