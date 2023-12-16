var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var deviceModel = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    stateFeed: {
      type: String,
      required: true,
    },
    modeFeed: {
      type: String,
      required: true,
    },
    deviceRecord: {
      type: [
        {
          state: {
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
  {
    timestamps: {
      createdAt: true,
      updatedAt: false,
    },
  }
);

module.exports = mongoose.model("Device", deviceModel);
