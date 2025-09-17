const express = require("express");
const { parc_statistics } = require("../controllers/parcController");

const router = express.Router();

router.get("/parc_statistics", parc_statistics);

module.exports = router;
