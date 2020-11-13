const { strict } = require("assert"); //Use strict mode error checking

//Catalogue data access object (DAO)

//db.once("open",createProduct);

//Test if connection worked
var testConnection=(req,res)=> {
    res.json({"_id":"no","content":"Connection works!"});
    //this.db.close();
}
// //Probably won't be used, this is just for testing
// createProduct(itemName, imageURLs, Price, description, inStock, daysToArrive, tags, rating, reviews) {
//     console.log("Connected to db.")
//     //Define schema for collection
//     var Product = this.productSchema;
//     //create product document instance/reference
//     var p1 = new Product({
//         "itemName": itemName,
//         "imageURLs": imageURLs,
//         "Price": Price,
//         "description": description,
//         "inStock": inStock,
//         "daysToArrive": daysToArrive,
//         "tags": tags,
//         "rating": rating,
//         "reviews": reviews
//     });

//     //Ready to save record to MongoDB
//     p1.save((err, result) => {
//         if (err) console.log("Error, item not created.....");
//         else console.log("Product added successfully..... Exitting....");
//         this.db.close();
//     });

// }

var viewCatalogue = (req,res) => {
        //Define schema for collection
    var Product = require("../models/item.model");
    //Find model in db
    Product.find({}, (err, result) => {
        if (err)
            res.json("Error, could not retrieve catalogue.....");
        else
            res.json({"_id":"results","content": result});
    });
}

// findProductsByName(itemName) {
//     console.log("Connected to db.")
//     //Define schema for collection
//     var Product = this.productSchema;
//     //Find model in db // case insensitive
//     //  /.*stainless.*/
//     Product.find({ "itemName": { $regex: new RegExp(itemName), $options: 'i' } }, (err, result) => {
//         if (err) console.log("Error, could not retrieve product specified.....");
//         else console.log(JSON.stringify(result, null, 2));
//         this.db.close();
//     })
// }
// findProductsByTag(tag) {
//     console.log("Connected to db.")
//     //Define schema for collection
//     var Product = this.productSchema();
//     //Find model in db // case insensitive
//     Product.find({ "tags": { $regex: new RegExp(tag), $options: 'i' } }, (err, result) => {
//         if (err) console.log("Error, could not retrieve product specified.....");
//         else console.log(JSON.stringify(result, null, 2));
//         this.db.close();
//     })
// }

module.exports={testConnection,viewCatalogue};

// //View catalogue test
// let catalogue = new catalogueDAO();
// catalogue.viewCatalogue(2);