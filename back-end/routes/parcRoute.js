const express = require("express");
const { parc_statistics, top_marques } = require("../controllers/parcController");

const router = express.Router();

router.get("/parc_statistics", parc_statistics);
router.get("/top_marques", top_marques);

module.exports = router;
