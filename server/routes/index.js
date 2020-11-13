const express = require('express');
const catalogueDAO = require("../controllers/catalogueDAO");
//const usersDAO = require("../controllers/usersDAO");
const router = express.Router();

router.get("/testConnection", catalogueDAO.testConnection);
//router.post("/", postController.store);

module.exports = router;