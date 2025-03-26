const express = require("express");
const { login, reg, current } = require("../controllers/users");
const { auth } = require("../middleware/auth");
const router = express.Router();

// api/users/login
router.post("/login", login);

// api/users/register
router.post("/reg", reg);

// api/users/current
router.get("/current", auth, current);

module.exports = router;