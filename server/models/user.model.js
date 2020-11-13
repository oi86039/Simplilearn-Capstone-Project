var mongoose=require("mongoose");
mongoose.pluralize(null); //avoid a post fix for the collection (?)

var userSchema = this.mongoose.Schema({
    "userType": String,
    "userName": String,
    "password": String,
    "email": String,
    "phone": Number,
    "shippingAddress": String,
    "shippingCity": String,
    "shippingState": String,
    "shippingZip": Number,
    "shippingCountry": String,
    'billingAddress': String,
    "billingCity": String,
    "billingState": String,
    "billingZip": Number,
    "billingCountry": String,
    "balance": Number,
    "cart": [
        {
            "_Id": String,
            "itemName": String,
            "imageURL": String,
            "Price": Number,
            "daysToArrive": Number,
            "rating": Number,
            "quantity": Number
        }
    ],
    "Purchase History": [
        {
            "_Id": String,
            "itemName": String,
            "imageURL": String,
            "Price": Number,
            "daysToArrive": Number,
            "rating": Number,
            "quantity": Number
        }
    ],
    "Viewing History": [
        {
            "_Id": String,
            "itemName": String,
            "imageURL": String,
            "Price": Number,
            "daysToArrive": Number,
            "rating": Number,
            "quantity": Number
        }
    ]
}, { collection: 'users' }); //Force collection name to be users
//map this schema to model
module.exports=mongoose.model("users", userSchema);