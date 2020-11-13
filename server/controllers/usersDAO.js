const { strict } = require("assert"); //Use strict mode error checking

//Catalogue data access object (DAO)
class usersDAO {
    constructor() {
        this.mongoose = require("mongoose"); //load module with mongoose schema framework
        this.uri = "mongodb://localhost:27017/testing"; //URI
        this.mongoose.connect(this.uri, { useNewUrlParser: true }); //reference ready to connect
        this.db = this.mongoose.connection;
        this.mongoose.Promise = global.Promise;
        this.db.on("error", (err) => console.log("Error! Failed to connect to database....." + err));
        //db.once("open",createProduct);
    }
    //#region Helpers
    
    //Test if connection worked
    testConnection() {
        console.log("Connected to db. Exitting.....")
        this.db.close();
    }
    //#endregion
    //Sign up functionality 
    createUserAccount(userName, password, email, phone) {
        console.log("Connected to db.")
        //Define schema for collection
        var User = this.defineUserSchema();
        //Check if username is unique.
        User.findOne({ "userName": userName }, (err, result) => {
            if (err) {
                console.log("Error, could not validate username.....");
                this.db.close();
                return;
            }
            //Duplicate name
            else if (result) {
                console.log("Invalid username: Must be unique.");
                this.db.close();
                return;
            }
            else {
                //If everything is valid, do more stuff.
                //create user document instance/reference
                var u1 = new User({
                    "userType": "user",
                    "userName": userName,
                    "password": password,
                    "email": email,
                    "phone": phone,
                    "shippingAddress": "",
                    "shippingCity": "",
                    "shippingState": "",
                    "shippingZip": 0,
                    "shippingCountry": "",
                    'billingAddress': "",
                    "billingCity": "",
                    "billingState": "",
                    "billingZip": "",
                    "billingCountry": "",
                    "balance": 0.00,
                    "cart": [],
                    "Purchase History": [],
                    "Viewing History": []
                });

                //Ready to save record to MongoDB
                u1.save((err, result2) => {
                    if (err) console.log("Error, user not created.....\n\n" + err);
                    else console.log("User added successfully..... Exitting....");
                    this.db.close();
                });
            }
        });
    }
    //Log in functionality
    login(userName, password) {
        console.log("Connected to db.")
        //Define schema for collection
        var Admin = this.defineAdminSchema();
        var User = this.defineUserSchema();
        //Check if username is admin or user type.
        Admin.findOne({ $and: [{ "userName": userName }, { "password": password }, { "userType": "admin" }] }, (err, result) => {
            if (err) {
                console.log("Error, could not log in. Please try again.....");
                this.db.close();
                return;
            }
            else if (!result) {
                User.findOne({ $and: [{ "userName": userName }, { "password": password }, { "userType": "user" }] }, (err, result) => {
                    if (err) {
                        console.log("Error, could not log in. Please try again.....");
                        this.db.close();
                        return;
                    }
                    else if (!result) {
                        console.log("Username/Password Incorrect.");
                        this.db.close();
                        return;
                    }
                    else {
                        //Sign into user homepage w/ res.redirect
                        console.log("User account signed into successfully");
                        this.db.close();
                        return;
                    }
                });
            }
            else {
                //Sign into admin portal w/ res.redirect
                console.log("Admin account signed into successfully");
                this.db.close();
                return;
            }
        });
    }
    //Only do this if there is a checkbox saying to save these.
    addShippingDetails(userName, shippingAddress, shippingCity, shippingState, shippingZip, shippingCountry) {
        console.log("Connected to db.")
        //Define schema for collection
        var User = this.defineUserSchema();
        //Check if username is unique.
        User.updateOne({ $and: [{ "userName": userName }, { "userType": "user" }] },
            {$set: {
                    "shippingAddress": shippingAddress,
                    "shippingCity": shippingCity,
                    "shippingState": shippingState,
                    "shippingZip": shippingZip,
                    "shippingCountry": shippingCountry
                }
            }, (err, result) => {
                if (err) {
                    console.log("Error, could not set shipping details.....");
                    this.db.close();
                    return;
                }
                //Duplicate name
                else {
                    console.log("Shipping details updated successfully.....");
                    this.db.close();
                    return;
                }
            });
    }

//Only do this if there is a checkbox saying to save these.
addBillingDetails(userName, billingAddress, billingCity, billingState, billingZip, billingCountry) {
    console.log("Connected to db.")
    //Define schema for collection
    var User = this.defineUserSchema();
    //Check if username is unique.
    User.updateOne({ $and: [{ "userName": userName }, { "userType": "user" }] },
        {$set: {
                "billingAddress": billingAddress,
                "billingCity": billingCity,
                "billingState": billingState,
                "billingZip": billingZip,
                "billingCountry": billingCountry
            }
        }, (err, result) => {
            if (err) {
                console.log("Error, could not set billing details.....");
                this.db.close();
                return;
            }
            //Duplicate name
            else {
                console.log("Billing details updated successfully.....");
                this.db.close();
                return;
            }
        });
}

    //Ignores admins
    viewAllUsers() {
        console.log("Connected to db.")
        //Define schema for collection
        var User = this.defineUserSchema();
        //Find model in db
        User.find({ "userType": "user" }, (err, result) => {
            if (err) console.log("Error, could not retrieve user.....");
            else console.log(JSON.stringify(result, null, 2));
            this.db.close();
        })
    }
    //Username must be unique
    findUserByName(userName) {
        console.log("Connected to db.")
        //Define schema for collection
        var User = this.defineUserSchema();
        //Find model in db // case insensitive
        User.find({ $and: [{ "userName": { $regex: new RegExp(userName), $options: 'i' } }, { "userType": "user" }] }, (err, result) => {
            if (err) console.log("Error, could not retrieve user specified.....");
            else console.log(JSON.stringify(result, null, 2));
            this.db.close();
        })
    }
}

//Main method for testing(use SCRAM-SHA1 for password hashing and salting)
let users = new usersDAO();
//users.createUserAccount("o","o","o@o.com",1231231233);
users.addBillingDetails("o","asd","asd","asdasd",12312,"asdalkj");