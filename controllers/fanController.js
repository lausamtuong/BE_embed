const fanModel = require("../models/fanModel");
const gasModel = require("../models/gasModel");
const humiModel = require("../models/humiModel");
const tempModel = require("../models/tempModel");
const listFans = async (req, res) => {
  try {
    const fans = await fanModel.find({});
    res.status(200).send({
      success: true,
      counTotal: fans.length,
      message: "All Fans ",
      fans,
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
const updateFan = async (req, res) => {
  try {
    const { id, ...rest } = req.body;
    console.log(id, rest);
    const fan = await fanModel.findOneAndUpdate({ id: id }, rest);
    await fan.save();
    res.status(201).send({
      success: true,
      message: " Updated Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in Update Fan",
    });
  }
};

const getHumi = async (req, res) => {
  try {
    const humi = await humiModel.findOne(res.body);
    res.status(200).send({
      success: true,
      counTotal: humi.length,
      message: "All Humi ",
      humi,
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

const getTemp = async (req, res) => {
  try {
    const temp = await tempModel.findOne(res.body);
    res.status(200).send({
      success: true,
      message: "All temp ",
      temp,
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

const getGas = async (req, res) => {
  try {
    const gas = await gasModel.findOne(res.body);
    res.status(200).send({
      success: true,
      counTotal: gas.length,
      message: "All gas ",
      gas,
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

module.exports = { listFans, updateFan, getGas, getHumi, getTemp };
