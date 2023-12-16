const logModel = require("../models/logModel");

const listLogController = async (req, res) => {
  try {
    const logs = await logModel.find({});
    res.status(200).send({
      success: true,
      counTotal: logs.length,
      message: "All Lamps ",
      logs,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Erorr in getting products",
      error: error.message,
    });
  }
};

const createLogController = async (req, res) => {
  try {
    const { content, time } = req.body;
    const logs = new logModel({
      content,
      time,
    });
    await logs.save();
    res.status(201).send({
      success: true,
      message: "log Created Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in crearing log",
    });
  }
};
module.exports = { createLogController, listLogController };
