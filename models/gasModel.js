const mongoose = require("mongoose");

const gasSchema = new mongoose.Schema(
  {
    value: {
      type: Number,
      required: true,
    },
    id: {
      type: String,
      required: true,
    },
    gasRecord: {
      type: [
        {
          value: {
            type: Number,
            required: true,
          },
          time: {
            type: Date,
            required: true,
          },
        },
      ],
      default: [],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("gas", gasSchema);
