const mongoose = require("mongoose");
 const listingSchema = new mongoose.Schema({
    title:String,
    url:String,
    address:String,
    vendor:String,
    type:String,
    price:String,
    area:String,
    address:String,
   
    description:String,
    date:String,
    time:String,
    

 });

 const Listing = mongoose.model("toriListing",listingSchema)
 module.exports = Listing;