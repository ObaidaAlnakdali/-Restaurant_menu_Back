var express = require("express");
var router = express.Router();
var controller = require("../controllers/item");
const verify = require('../controllers/verifyToken');

router.get("/", controller.getAll);
router.post("/", controller.post);
router.put("/:id", controller.put);
router.delete("/:id", controller.delete);
 
module.exports = router;
