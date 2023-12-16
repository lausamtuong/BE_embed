const {
  listFans,
  updateFan,
  getTemp,
  getHumi,
  getGas,
} = require("../controllers/fanController");

const router = require("express").Router();

router.get("/list", listFans);
router.post("/temp", getTemp);
router.post("/humi", getHumi);
router.post("/gas", getGas);
router.post("/update", updateFan);
module.exports = router;
