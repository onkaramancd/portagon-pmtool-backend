const express = require("express");
const router = express.Router();
const converterController = require("../controllers/converter");

router.post("/md", converterController.convertHTMLtoMD);

module.exports = router;