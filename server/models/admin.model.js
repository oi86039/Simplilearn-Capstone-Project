var mongoose=require("mongoose");
mongoose.pluralize(null); //avoid a post fix for the collection (?)

var adminSchema = this.mongoose.Schema({
    "userType": String,
    "userName": String,
    "password": String
}, { collection: 'users' }); //Force collection name to be users 

//map this schema to model
module.exports=mongoose.model("admins", adminSchema);