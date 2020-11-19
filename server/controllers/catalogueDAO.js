const { strict } = require("assert"); //Use strict mode error checking
var mongoose = require('mongoose');

//Catalogue data access object (DAO)
var Product = require("../models/item.model");

//Test if connection worked
var testConnection = (req, res) => {
    res.json({ "_id": "Yes!", "content": "Connection works!" });
}

//#region Create
//Admin function - Post uses req.body
var admin_createProduct = (req, res) => {
    //create product document instance/reference (all properties must be present in order to update the database)
    var p1 = new Product({
        "_id": mongoose.mongo.ObjectId(),
        "itemName": req.body.itemName,
        "imageURLs": req.body.imageURLs,
        "Price": req.body.Price,
        "description": req.body.description,
        "inStock": req.body.inStock,
        "daysToArrive": req.body.daysToArrive,
        "tags": req.body.tags,
        "rating": req.body.rating,
        "reviews": []
    });
    //console.log(p1);
    //Ready to save record to MongoDB
    p1.save((err, result) => {
        if (err) {
            res.json({ "token": "false", "msg": "Error, item not created....." });
            console.log(err);
        }
        else res.json({ "token": "true", "msg": "item created successfully....." });
    });
}
//#endregion

//#region Retrieve
var viewAllProducts = (req, res) => {
    //Find model in db
    Product.find({}, (err, result) => {
        if (err)
            res.json({ "token": "false", "msg": "Error, could not retrieve catalogue....." });
        else{
            //console.log(result);
            res.json({ "token": "true", "content": result });
        }
    });
}
var findProductsByName = (req, res) => {
    //Find model in db // case insensitive
    Product.find({ "itemName": { $regex: new RegExp(req.params.name), $options: 'i' } }, (err, result) => {
        if (err) res.json({ "token": "false", "msg": "Error, could not retrieve product specified....." });
        else res.json({ "token": "true", "content": result });
    })
}

//params is used for link variables
var findProductsById = (req, res) => {
    //Find model in db // case insensitive
    Product.find({ "_id": { $regex: new RegExp(req.params._id), $options: 'i' }}, (err, result) => {
        if (err) {
            //console.log(err);
            res.json({ "token": "false", "msg": "Error, could not retrieve product specified....." });}
        else {
            //console.log(req.params._id +" | "+ result);
            res.json({ "token": "true", "content": result });}
    })
}
var findProductsByTag = (req, res) => {
    //Find model in db // case insensitive
    Product.find({ "tags": { $regex: new RegExp(req.params._tag), $options: 'i' } }, (err, result) => {
        if (err) res.json({ "token": "false", "msg": "Error, could not retrieve product specified....." });
        else res.json({ "token": "true", "content": result });
    })
}
//#endregion

//#region Update
//Search by id and update with given attributes
var admin_UpdateProduct = (req, res) => {
    Product.update({ _id: req.params._id }, {
        $set:
        {
            itemName: req.body.itemName,
            imageURLs: req.body.imageURLs,
            Price: req.body.Price,
            description: req.body.description,
            inStock: req.body.inStock,
            daysToArrive: req.body.daysToArrive,
            tags: req.body.tags,
            rating: req.body.rating,
        }
    }, (err, result) => {
        if (err) throw err;
        if (result.nModified > 0) {
            if (err) res.json({ "token": "true", "msg": "Record updated successfully" });
        } else {
            if (err) res.json({ "token": "false", "msg": "Error: Record didn't update" });
        }
    })
}
//#endregion

//#region Delete
var admin_DeleteProduct = (req, res) => {
    Product.deleteOne({ _id: req.params._id }, (err, result) => {
        if (err) throw err;
        if (result.deletedCount > 0) {
            if (err) res.json({ "token": "true", "msg": "Record deleted successfully" })
        } else {
            if (err) res.json({ "token": "false", "msg": "Record not present" })
        }
    })
}
//#endregion

module.exports = { testConnection, admin_createProduct, viewAllProducts, findProductsByName, findProductsById, findProductsByTag, admin_UpdateProduct, admin_DeleteProduct };