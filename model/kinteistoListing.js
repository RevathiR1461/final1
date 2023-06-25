const mongoose = require("mongoose");
 const listingSchema = new mongoose.Schema({
    title:String,
    url:String,
    address:String,
    vendor:String,
    type:String,
    year:String,
    correction:String,
    area:String,
    price:String,
    date:String,
    time:String,

 });

 const Listing = mongoose.model("kinteistoListing",listingSchema)
 module.exports = Listing;