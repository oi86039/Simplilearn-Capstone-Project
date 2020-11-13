const { strict } = require("assert"); //Use strict mode error checking



//Catalogue data access object (DAO)
class catalogueDAO {
    constructor() {
        this.mongoose = require("mongoose"); //load module with mongoose schema framework
        this.uri = "mongodb://localhost:27017/testing"; //URI
        this.mongoose.connect(this.uri, { useNewUrlParser: true }); //reference ready to connect
        this.db = this.mongoose.connection;
        this.mongoose.Promise = global.Promise;
        this.db.on("error", (err) => console.log("Error! Failed to connect to database....." + err));

        //Global var schema for product
        this.productSchema = require("../models/item.model");
    }
    //db.once("open",createProduct);

    //Test if connection worked
    testConnection() {
        console.log("Connected to db. Exitting.....")
        this.db.close();
    }
    //Probably won't be used, this is just for testing
    createProduct(itemName, imageURLs, Price, description, inStock, daysToArrive, tags, rating, reviews) {
        console.log("Connected to db.")
        //Define schema for collection
        var Product = this.productSchema;
        //create product document instance/reference
        var p1 = new Product({
            "itemName": itemName,
            "imageURLs": imageURLs,
            "Price": Price,
            "description": description,
            "inStock": inStock,
            "daysToArrive": daysToArrive,
            "tags": tags,
            "rating": rating,
            "reviews": reviews
        });

        //Ready to save record to MongoDB
        p1.save((err, result) => {
            if (err) console.log("Error, item not created.....");
            else console.log("Product added successfully..... Exitting....");
            this.db.close();
        });

    }

    viewCatalogue(limit) {
        console.log("Connected to db.")
        //Define schema for collection
        var Product = this.productSchema;
        //Find model in db
        Product.find({}, (err, result) => {
            if (err) console.log("Error, could not retrieve catalogue.....");
            else console.log(JSON.stringify(result, null, 2));
            this.db.close();
        }).limit(limit);
    }

    findProductsByName(itemName) {
        console.log("Connected to db.")
        //Define schema for collection
        var Product = this.productSchema;
        //Find model in db // case insensitive
        //  /.*stainless.*/
        Product.find({ "itemName": { $regex: new RegExp(itemName), $options: 'i' } }, (err, result) => {
            if (err) console.log("Error, could not retrieve product specified.....");
            else console.log(JSON.stringify(result, null, 2));
            this.db.close();
        })
    }
    findProductsByTag(tag) {
        console.log("Connected to db.")
        //Define schema for collection
        var Product = this.productSchema();
        //Find model in db // case insensitive
        Product.find({ "tags": { $regex: new RegExp(tag), $options: 'i' } }, (err, result) => {
            if (err) console.log("Error, could not retrieve product specified.....");
            else console.log(JSON.stringify(result, null, 2));
            this.db.close();
        })
    }
}
//View catalogue test
let catalogue = new catalogueDAO();
catalogue.viewCatalogue(2);