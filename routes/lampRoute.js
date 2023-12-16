const { listLamps, updateLamp } = require("../controllers/lampController");

const router = require("express").Router();

router.get("/list", listLamps);
router.post("/update", updateLamp);
module.exports = router;
