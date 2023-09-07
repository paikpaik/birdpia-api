const express = require("express");
const { isLoggedIn } = require("../middlewares");
const { renderLogin, createDomain } = require("../controllers/index");
const router = express.Router();

router.get("/", renderLogin);
router.post("/domain", isLoggedIn, createDomain);

module.exports = router;
