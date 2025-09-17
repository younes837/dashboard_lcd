const express = require("express");
const { ca_reservation } = require("../controllers/reservationController");

const router = express.Router();

router.get("/ca_reservation", ca_reservation);

module.exports = router;
