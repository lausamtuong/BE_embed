const mongoose = require("mongoose");

const logSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("logs", logSchema);
