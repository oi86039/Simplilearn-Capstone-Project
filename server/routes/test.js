const express = require('express');
const catalogueDAO = require("../controllers/catalogueDAO");
const usersDAO = require("../controllers/usersDAO");
const cartDAO = require("../controllers/cartDAO");
const router = express.Router();

//Product/Catalogue
router.get("/", catalogueDAO.testConnection);
router.post("/admin/createProduct", catalogueDAO.admin_createProduct);
router.get("/viewAllProducts", catalogueDAO.viewAllProducts);
router.get("/findProductsByName/:name", catalogueDAO.findProductsByName);
router.get("/findProductsById/:_id", catalogueDAO.findProductsById);
router.get("/findProductsByTag/:_tag", catalogueDAO.findProductsByTag);
router.put("/admin/updateProduct/:_id", catalogueDAO.admin_UpdateProduct); //param comes from angular, not url
router.delete("/admin/deleteProduct/:_id", catalogueDAO.admin_DeleteProduct)

//User
router.post("/login/:userName", usersDAO.login); //param comes from angular, not url
router.post("/createUser", usersDAO.createUser); //param comes from angular, not url
router.put("/admin/createUser", usersDAO.admin_createUser); //param comes from angular, not url
router.get("/admin/viewAllUsers", usersDAO.admin_viewAllUsers);
router.get("/admin/findUserByName/:name", usersDAO.admin_findUserByName);
router.get("/admin/findUserById/:id", usersDAO.admin_findUserById);
router.put("/admin/updateUser", usersDAO.admin_updateUser); //param comes from angular, not url
router.put("/addShippingDetails", usersDAO.addShippingDetails); //param comes from angular, not url
router.put("/addBillingDetails", usersDAO.addBillingDetails); //param comes from angular, not url
router.delete("/admin/deleteUser/:id", usersDAO.admin_deleteUser)

//Cart
router.get("/viewCart/:userName", cartDAO.viewCart);
router.put("/addToCart/:userName/", cartDAO.addToCart);
router.put("/deleteFromCart/:userName", cartDAO.deleteFromCart); //param comes from angular, not url
router.delete("/emptyCart/:userName", cartDAO.emptyCart);

//module.exports=[viewCart,addToCart,deleteFromCart,emptyCart];

//testConnection,createProduct,viewAllProducts,findProductsByName,findProductsById,
//findProductsByTag,UpdateProduct,DeleteProduct};

//{login,createUser,admin_createUser,admin_viewAllUsers,
//admin_findUserByName,admin_findUserById,admin_updateUser,
//addShippingDetails,addBillingDetails,admin_deleteUser};

module.exports = router;