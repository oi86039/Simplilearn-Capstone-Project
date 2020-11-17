const { strict } = require("assert"); //Use strict mode error checking

//User data access object (DAO)
var User = require("../models/user.model");
var Admin = require("../models/admin.model");

//Log in functionality
var login = (req, res) => {
    //Check if username is admin or user type.
    Admin.findOne({ $and: [{ "userName": req.body.userName }, { "password": req.body.password }, { "userType": "admin" }] }, (err, result) => {
        if (err) {
            res.json({ "token": "false", "msg": "Error, could not log in. Please try again....." });
            return;
        }
        else if (!result) {
            User.findOne({ $and: [{ "userName": req.body.userName }, { "password": req.body.password }, { "userType": "user" }] }, (err, result) => {
                if (err) {
                    res.json({ "token": "false", "msg": "Error, could not log in. Please try again....." });
                    return;
                }
                else if (!result) {
                    res.json({ "token": "false", "msg": "Username/Password Incorrect." });
                    return;
                }
                else {
                    //Sign into user homepage w/ res.redirect
                    res.json({ "token": "true", "msg": "User account signed into successfully" });
                    return;
                }
            });
        }
        else {
            //Sign into admin portal w/ res.redirect
            res.json({ "token": "true", "msg": "Admin account signed into successfully" });
            return;
        }
    });
}

//#region Create
//Sign up functionality //Admins are NOT accessible. They must be created manually
var createUser = (req, res) => {
    //Check if username is unique.
    User.findOne({ "userName": req.body.userName }, (err, result) => {
        if (err) {
            res.json({ "token": "false", "msg": "Error, could not validate username....." });
            return;
        }
        //Duplicate name
        else if (result) {
            res.json({ "token": "false", "msg": "Invalid username: Must be unique." });
            return;
        }
        else {
            //If everything is valid, do more stuff.
            //create user document instance/reference
            var u1 = new User({
                "userType": "user",
                "userName": req.body.userName,
                "password": req.body.password,
                "email": req.body.email,
                "phone": req.body.phone,
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
                if (err) res.json({ "token": "false", "msg": "Error, user not created....." });
                else res.json({ "token": "true", "msg": "User added successfully..... Exitting...." });
            });
        }
    });
}
var admin_createUser = (req, res) => {
    //Check if username is unique.
    User.findOne({ "userName": req.body.userName }, (err, result) => {
        if (err) {
            res.json({ "token": "false", "msg": "Error, could not validate username....." });
            return;
        }
        //Duplicate name
        else if (result) {
            res.json({ "token": "false", "msg": "Invalid username: Must be unique." });
            return;
        }
        else {
            //If everything is valid, do more stuff.
            //create user document instance/reference
            var u1 = new User({
                "userType": "user",
                "userName": req.body.userName,
                "password": req.body.password,
                "email": req.body.email,
                "phone": req.body.phone,
                "shippingAddress": req.body.shippingAddress,
                "shippingCity": req.body.shippingCity,
                "shippingState": req.body.shippingState,
                "shippingZip": req.body.shippingZip,
                "shippingCountry": req.body.shippingCountry,
                'billingAddress': req.body.billingAddress,
                "billingCity": req.body.billingCity,
                "billingState": req.body.billingState,
                "billingZip": req.body.billingZip,
                "billingCountry": req.body.billingCountry,
                "balance": req.body.balance,
                "cart": [],
                "Purchase History": [],
                "Viewing History": []
            });

            //Ready to save record to MongoDB
            u1.save((err, result2) => {
                if (err) res.json({ "token": "false", "msg": "Error, user not created....." });
                else res.json({ "token": "true", "msg": "User added successfully..... Exitting...." });
            });
        }
    });
}
//#endregion

//#region Retrieve
var admin_viewAllUsers = (req, res) => {
    //Find model in db
    User.find({ "userType": "user" }, (err, result) => {
        if (err)
            res.json({ "token": "false", "msg": "Error, could not retrieve user list....." });
        else
            res.json({ "token": "true", "content": result });
    });
}
//Username must be unique
var admin_findUserByName = (req, res) => {
    //Find model in db // case insensitive
    User.find({ $and: [{ "userName": { $regex: new RegExp(req.body.userName), $options: 'i' } }, { "userType": "user" }] }, (err, result) => {
        if (err) res.json({ "token": "false", "msg": "Error, could not retrieve user specified....." });
        else res.json({ "token": "true", "content": result });
    });
}
//Username must be unique
var admin_findUserById = (req, res) => {
    //Find model in db // case insensitive
    User.find({ $and: [{ "_id": { $regex: new RegExp(req.body._id), $options: 'i' } }, { "userType": "user" }] }, (err, result) => {
        if (err) res.json({ "token": "false", "msg": "Error, could not retrieve user specified....." });
        else res.json({ "token": "true", "content": result });
    });
}
//#endregion

//#region Update
//Search by id and update with given attributes
var admin_updateUser = (req, res) => {
    User.update({ _id: req.body._id }, {
        $set:
        {
            "userName": req.body.userName,
            "password": req.body.password,
            "email": req.body.email,
            "phone": req.body.phone,
            "shippingAddress": req.body.shippingAddress,
            "shippingCity": req.body.shippingCity,
            "shippingState": req.body.shippingState,
            "shippingZip": req.body.shippingZip,
            "shippingCountry": req.body.shippingCountry,
            'billingAddress': req.body.billingAddress,
            "billingCity": req.body.billingCity,
            "billingState": req.body.billingState,
            "billingZip": req.body.billingZip,
            "billingCountry": req.body.billingCountry,
            "balance": req.body.balance,
        }
    }, (err, result) => {
        if (err) throw err;
        if (result.nModified > 0) {
            res.json({ "token": "true", "msg": "Record updated successfully" });
        } else {
            res.json({ "token": "false", "msg": "Error: Record didn't update" });
        }
    })
}
//Only do this if there is a checkbox saying to save these.
var addShippingDetails = (req, res) => {
    //Check if username is unique.
    User.updateOne({ $and: [{ "userName": req.body.userName }, { "userType": "user" }] },
        {
            $set: {
                "shippingAddress": req.body.shippingAddress,
                "shippingCity": req.body.shippingCity,
                "shippingState": req.body.shippingState,
                "shippingZip": req.body.shippingZip,
                "shippingCountry": req.body.shippingCountry
            }
        }, (err, result) => {
            if (err) {
                res.json({ "token": "false", "msg": "Error, could not set shipping details....." });
                return;
            }
            //Duplicate name
            else {
                res.json({ "token": "true", "msg": "Shipping details updated successfully....." });
                return;
            }
        });
}
var addBillingDetails = (req, res) => {
    //Check if username is unique.
    User.updateOne({ $and: [{ "userName": userName }, { "userType": "user" }] },
        {
            $set: {
                "billingAddress": billingAddress,
                "billingCity": billingCity,
                "billingState": billingState,
                "billingZip": billingZip,
                "billingCountry": billingCountry
            }
        }, (err, result) => {
            if (err) {
                res.json({ "token": "false", "msg": "Error, could not set billing details....." });
                return;
            }
            //Duplicate name
            else {
                res.json({ "token": "true", "msg": "Billing details updated successfully....." });
                return;
            }
        });
}
//#endregion

//#region Delete
var admin_deleteUser = (req, res) => {
    User.deleteOne({ _id: req.params.id }, (err, result) => {
        if (err) throw err;
        if (result.deletedCount > 0) {
            res.json({ "token": "true", "msg": "Record deleted successfully" })
        } else {
            res.json({ "token": "false", "msg": "Record not present" })
        }
    })
}
//#endregion

module.exports = {login,createUser,admin_createUser,admin_viewAllUsers,admin_findUserByName,admin_findUserById,admin_updateUser,addShippingDetails,addBillingDetails,admin_deleteUser};