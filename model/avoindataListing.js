const mongoose = require("mongoose");
 const listingSchema = new mongoose.Schema({
    Title:String,
    url:String,
    Rekisteröity:String,
    Toimiala:String,
    buisnessId:String,
    companyform:String,
    address:String,
    date:String,
    time:String,
    

 });

 const Listing = mongoose.model("avoindataListing",listingSchema)
 module.exports = Listing;