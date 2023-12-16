const {
  createLogController,
  listLogController,
} = require("../controllers/logController");

const router = require("express").Router();

// router.get("/list", listLamps);
router.post("/create", createLogController);
router.get("/list", listLogController);
module.exports = router;
