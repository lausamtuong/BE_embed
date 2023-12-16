var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var sensorModel = new Schema(
  {
    type: {
      type: String,
      required: true,
    },
    unit: {
      type: String,
      required: true,
    },
    feed: {
      type: String,
      required: true,
    },
    sensorRecord: {
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
    // room: {
    //   type: Schema.Types.ObjectId,
    //   required: true,
    //   ref: "Room",
    // },
  },
  {
    timestamps: {
      createdAt: true,
      updatedAt: false,
    },
  }
);

module.exports = mongoose.model("Sensor", sensorModel);
