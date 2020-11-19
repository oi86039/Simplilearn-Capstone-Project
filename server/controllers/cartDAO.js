const { strict } = require("assert"); //Use strict mode error checking

//User data access object (DAO)
var User = require("../models/user.model");
var Product = require("../models/item.model");

//#region Create
//#endregion
//#region Retrieve
var viewCart = (req, res) => {
    //Find model in db // case insensitive
    User.findOne({ $and: [{ "userName": { $regex: new RegExp(req.params.userName), $options: 'i' } }, { "userType": "user" }] }, (err, result) => {
        if (err) res.json({ "token": "false", "msg": "Error, could not retrieve user/cart specified....." });
        else {
            console.log(result.cart);
            res.json({ "token": "true", "content": result.cart });}
    });
}
//#endregion
//#region Update
var addToCart = (req, res) => {
    //Get product
    Product.findOne({ "_id": { $regex: new RegExp(req.body.product_id), $options: 'i' } }, (err, result) => {
        if (err) res.json({ "token": "false", "msg": "Error, could not retrieve product specified....." });
        else {
            console.log(result);            
            //Update user cart
            User.update({ userName: req.params.userName }, {
                $push: {
                    cart: {
                        "_id": result._id,
                        "itemName": result.itemName,
                        "imageURL": result.imageURLs[0],
                        "Price": result.Price,
                        "inStock": result.inStock,
                        "daysToArrive": result.daysToArrive,
                        "tags": result.tags,
                        "rating": result.rating,
                        "quantity": 1
                    }
                }
            }, (err2, result2) => {
                if (err2) throw err2;
                if (result2.nModified > 0) {
                    res.json({ "token": "true", "msg": "Cart updated successfully" });
                } else {
                    res.json({ "token": "false", "msg": "Error: Cart didn't update" });
                }
            })
        }

    })
}
//#endregion
//#region Delete
var deleteFromCart = (req, res) => {
    //Get product
    Product.find({ "_id": { $regex: new RegExp(req.body.product_id), $options: 'i' } }, (err, result) => {
        if (err) res.json({ "token": "false", "msg": "Error, could not retrieve product specified....." });
        else {
            //Update user cart
            User.update({ userName: req.params.userName }, {
                $pull: {
                    cart: {
                        "_id": result._id
                    }
                }
            }, (err2, result2) => {
                if (err2) throw err2;
                if (result2.nModified > 0) {
                    res.json({ "token": "true", "msg": "Cart entry deleted successfully" });
                } else {
                    res.json({ "token": "false", "msg": "Error: Cart didn't delete entry" });
                }
            })
        }

    });
}
var emptyCart = (req, res) => {
    //Get product
    Product.find({ "_id": { $regex: new RegExp(req.body._id), $options: 'i' } }, (err, result) => {
        if (err) res.json({ "token": "false", "msg": "Error, could not retrieve product specified....." });
        else {
            //Update user cart
            User.update({ userName: req.params.userName }, {
                $set: {
                    cart: []
                }
            }, (err2, result2) => {
                if (err2) throw err2;
                if (result2.nModified > 0) {
                    res.json({ "token": "true", "msg": "Cart emptied successfully" });
                } else {
                    res.json({ "token": "false", "msg": "Error: Cart didn't empty" });
                }
            })
        }

    })
}//#endregion

module.exports={viewCart,addToCart,deleteFromCart,emptyCart};