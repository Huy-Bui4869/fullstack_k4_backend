const express = require("express");
const router = express.Router();
const mailControllers = require("../controllers/mail.controller");

/* GET home page. */
router.get("/", mailControllers.index);
router.get("/send", mailControllers.send);
router.post("/send", mailControllers.handleSend);
router.get("/history", mailControllers.history);
router.post("/detail/:id", mailControllers.details);

module.exports = router;
