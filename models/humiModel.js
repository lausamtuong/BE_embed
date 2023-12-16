const mongoose = require("mongoose");

const humiSchema = new mongoose.Schema(
  {
    value: {
      type: Number,
      required: true,
    },
    id: {
      type: String,
      required: true,
    },
    humiRecord: {
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

module.exports = mongoose.model("humi", humiSchema);
