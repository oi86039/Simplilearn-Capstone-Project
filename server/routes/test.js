const express = require('express');
const catalogueDAO = require("../controllers/catalogueDAO");
//const usersDAO = require("../controllers/usersDAO");
const router = express.Router();

router.get("/", catalogueDAO.testConnection);
router.post("/addProduct", catalogueDAO.createProduct);

module.exports = router;