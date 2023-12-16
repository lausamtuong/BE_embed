// const ChatMessage = require('../models/chatMessageModel');
// const User = require('../models/userModel');
// const Room = require('../models/roomModel');
const Device = require("../models/deviceModel");
const Sensor = require("../models/sensorModel");
const Lamp = require("../models/lampModel");

// const ChatRoom = require('../models/chatRoomModel');
const jwt = require("jsonwebtoken");
class WebSockets {
  users = [];
  connection(client) {
    client.join(`${process.env.ADA_USERNAME}/feeds/dadn-fan-1`);
    client.join(`${process.env.ADA_USERNAME}/feeds/dadn-human`);
    client.join(`${process.env.ADA_USERNAME}/feeds/dadn-gas`);
    client.join(`${process.env.ADA_USERNAME}/feeds/dadn-led-1`);
    client.join(`${process.env.ADA_USERNAME}/feeds/dadn-temp-1`);
    client.join(`${process.env.ADA_USERNAME}/feeds/dadn-humi-1`);
    client.join(`${process.env.ADA_USERNAME}/feeds/dadn-auto`);
    client.join(`${process.env.ADA_USERNAME}/feeds/dadn-detect-human`);
    // event fired when the chat room is disconnected
    client.on("disconnect", (reason) => {
      // this.users = this.users.filter((user) => user.socketId !== client.id);
    });
    io.on("error", (error) => {
      console.log(`error: `, error);
    });
  }
  async socketAuth(client, next) {
    try {
      // const token =  client.handshake.headers.token;
      const lampID = client.handshake.headers.lampid;
      client.handshake.auth.devices = await Device.find({
        id: "123",
      }).lean();
      client.handshake.auth.sensors = await Sensor.find({
        lampID: "123",
      }).lean();
      client.handshake.auth.lamp = await Lamp.find({
        id: lampID,
      }).lean();

      next();
    } catch {
      client.disconnect();
      console.log("Not authorized, token failed");
    }
  }
}

module.exports = new WebSockets();
