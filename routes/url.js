const express = require("express");
const router = express.Router();
const { GeneratenewShortURL } = require("../controllers/url");

router.post("/", GeneratenewShortURL);

router.get("/analytics/:shortID");
module.exports = router;
