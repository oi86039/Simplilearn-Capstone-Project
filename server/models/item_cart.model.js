var mongoose=require("mongoose");
mongoose.pluralize(null); //avoid a post fix for the collection (?)

var itemSchema = mongoose.Schema({
    "_Id": String,
    "itemName": String,
    "imageURL": String,
    "Price": Number,
    "inStock": Number,
    "daysToArrive": Number,
    "tags": [{ type: String }],
    "rating": Number,
    "quantity": Number
}, { collection: 'catalogue' }); //Force collection name to be catalogue

module.exports=mongoose.model("catalogue", itemSchema);