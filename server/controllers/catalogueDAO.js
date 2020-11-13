const { strict } = require("assert"); //Use strict mode error checking

//Catalogue data access object (DAO)
var Product = require("../models/item.model");

//Test if connection worked
var testConnection = (req, res) => {
    res.json({ "_id": "Yes!", "content": "Connection works!" });
}
//Admin function
var createProduct = (req, res) => {
    console.log("Connected to db.")
    //create product document instance/reference
    var p1 = new Product({
        "itemName": req.body.itemName,
        "imageURLs": req.body.imageURLs,
        "Price": req.body.Price,
        "description": req.body.description,
        "inStock": req.body.inStock,
        "daysToArrive": req.body.daysToArrive,
        "tags": req.body.tags,
        "rating": req.body.rating,
        "reviews": req.body.reviews
    });

    //Ready to save record to MongoDB
    p1.save((err, result) => {
        if (err) res.send("Error, item not created.....");
        else res.send("Product added successfully..... Exitting....");
    });

}

var viewCatalogue = (req, res) => {
    //Find model in db
    Product.find({}, (err, result) => {
        if (err)
            res.json("Error, could not retrieve catalogue.....");
        else
            res.json({ "_id": "results", "content": result });
    });
}

var findProductsByName = (req, res) => {
    //Find model in db // case insensitive
    Product.find({ "itemName": { $regex: new RegExp(req.body.itemName), $options: 'i' } }, (err, result) => {
        if (err) console.log("Error, could not retrieve product specified.....");
        else console.log(JSON.stringify(result, null, 2));
    })
}
var findProductsByTag = (req, res) => {
    //Find model in db // case insensitive
    Product.find({ "tags": { $regex: new RegExp(req.body.tag), $options: 'i' } }, (err, result) => {
        if (err) console.log("Error, could not retrieve product specified.....");
        else console.log(JSON.stringify(result, null, 2));
    })
}

module.exports = { testConnection, createProduct, viewCatalogue, findProductsByName, findProductsByTag };