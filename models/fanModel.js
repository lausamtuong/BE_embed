const mongoose = require("mongoose");

const fanSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    id: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    power: {
      type: String,
      required: true,
    },
    intensity: {
      type: Number,
      required: true,
    },

    working_time_start: {
      type: String,
      required: true,
    },
    working_time_end: {
      type: String,
      required: true,
    },
    is_set_working_time: {
      type: Boolean,
      required: true,
    },
    fanRecord: {
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
    imageUrl: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("fans", fanSchema);
