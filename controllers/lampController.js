const lampModel = require("../models/lampModel");
const listLamps = async (req, res) => {
  try {
    const lamps = await lampModel.find({});
    res.status(200).send({
      success: true,
      counTotal: lamps.length,
      message: "All Lamps ",
      lamps,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Erorr in getting products",
      error: error.message,
    });
  }
};
const updateLamp = async (req, res) => {
  try {
    const { id, ...rest } = req.body;
    const lamp = await lampModel.findOneAndUpdate({ id: id }, rest);
    await lamp.save();
    res.status(201).send({
      success: true,
      message: " Updated Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in Update product",
    });
  }
};
module.exports = { listLamps, updateLamp };
