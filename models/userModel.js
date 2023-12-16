const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    auto_mode: {
      type: Number,
      required: true,
    },
    auto_detect_human: {
      type: Number,
      required: false,
    },
    is_human_in_room: {
      type: Number,
      required: false,
    },
    outdoor_mode: {
      type: Number,
      required: false,
    },
    gas_sensor: {
      type: Number,
      required: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("users", userSchema);
