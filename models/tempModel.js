const mongoose = require("mongoose");

const tempSchema = new mongoose.Schema(
  {
    value: {
      type: Number,
      required: true,
    },
    id: {
      type: String,
      required: true,
    },
    tempRecord: {
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

module.exports = mongoose.model("temp", tempSchema);
