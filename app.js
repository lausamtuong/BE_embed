const express = require("express");
const mqtt = require("mqtt");
const app = express();
const hbs = require("nodemailer-express-handlebars");
const nodemailer = require("nodemailer");
const path = require("path");
const morgan = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv/config");
const authJwt = require("./helpers/jwt");
const errorHandler = require("./helpers/error-handler");
const authRoutes = require("./routes/authRoute.js");
const categoryRoutes = require("./routes/categoryRoute.js");
const productRoutes = require("./routes/productRoute.js");
const lampRoutes = require("./routes/lampRoute.js");
const logRoutes = require("./routes/logRoute.js");
const fanRoutes = require("./routes/fanRoute.js");
const Device = require("./models/deviceModel");
const Lamp = require("./models/lampModel");
const Fan = require("./models/fanModel");
const Humi = require("./models/humiModel");
const Temp = require("./models/tempModel");
const Gas = require("./models/gasModel");
const Sensor = require("./models/sensorModel");
const User = require("./models/userModel");
const WebSockets = require("./utils/WebSockets");
const http = require("http");
const server = http.createServer(app);
global.io = require("socket.io")(server, { cors: { origin: "*" } });
app.use(cors());
app.options("*", cors());

//middleware
app.use(express.json());
app.use(morgan("tiny"));
// app.use(authJwt());
app.use("/public/uploads", express.static(__dirname + "/public/uploads"));
const api = process.env.API_URL;

global.io.use(WebSockets.socketAuth);
global.io.on("connection", WebSockets.connection);

app.use(`${api}/auth`, authRoutes);
app.use(`${api}/category`, categoryRoutes);
app.use(`${api}/product`, productRoutes);
app.use(`${api}/lamps`, lampRoutes);
app.use(`${api}/fans`, fanRoutes);
app.use(`${api}/logs`, logRoutes);

//Database
mongoose
  .connect(process.env.CONNECTION_STRING, {
    dbName: "smart-home",
  })
  .then(() => {
    console.log("Database Connection is ready...");
  })
  .catch((err) => {
    console.log(err);
  });

const ada_user = process.env.ADA_USERNAME;
const ada_key = process.env.ADA_KEY;

var transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "anhminhdgnl2022@gmail.com",
    pass: "rmoudkctdcmluuen",
  },
});

// point to the template folder
const handlebarOptions = {
  viewEngine: {
    partialsDir: path.resolve("./views/"),
    defaultLayout: false,
  },
  viewPath: path.resolve("./views/"),
};

async function sendEmail(type, gas, convertedTimestamp) {
  transporter.use("compile", hbs(handlebarOptions));
  const mailOptions = {
    from: "obstuong@gmail.com", // sender address
    template: type, // the name of the template file, i.e., email.handlebars
    to: "obstuong@gmail.com",
    subject: `Warning Smart Home`,
    context: {
      name: "obstuong@gmail.com",
      time: convertedTimestamp,
      gas: gas,
    },
  };
  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.log(error);
  }
}

const client = mqtt.connect({
  host: process.env.ADA_HOST,
  port: 1883,
  username: ada_user,
  password: ada_key,
  clientId: "mqttjs_" + Math.random().toString(16).substring(2, 8),
});

client.on("connect", function () {
  // aio.feeds().then(feeds => {
  //     console.log(feeds);
  // });
  let feedList = [
    "dadn-auto",
    "dadn-human",
    "dadn-detect-human",
    "dadn-fan-1",
    "dadn-gas",
    "dadn-humi-1",
    "dadn-led-1",
    "dadn-temp-1",
  ];
  feedList.forEach((x) => {
    client.subscribe(`${ada_user}/feeds/${x}`);
  });
  console.log("Connected to adafruit feed");
});

client.on("message", async function (topic, message) {
  console.log("Received topic:", topic.toString());
  console.log("Received message:", message.toString());

  let feed = topic
    .toString()
    .substring(`${process.env.ADA_USERNAME}/feeds/`.length);
  let stateFeed = feed;
  //add light value
  switch (feed) {
    case "dadn-detect-human":
      await User.updateMany({
        auto_detect_human: Number(message),
      });
      break;
    case "dadn-human":
      await User.updateMany({
        is_human_in_room: Number(message),
      });
      const user = await User.findOne({
        username: "obstuongtest",
      });
      if (user.outdoor_mode === 1) {
        const timestamp = new Date(user.updatedAt);
        const options = { timeZone: "Asia/Bangkok" };
        const convertedTimestamp = timestamp.toLocaleString("en-US", options);
        await sendEmail("email", convertedTimestamp);
        global.io.emit("someone_in_home", message.toString());
      }
      break;
    case "dadn-auto":
      await User.updateMany({
        auto_mode: Number(message),
      });
      break;
    case "dadn-led-1":
      await Lamp.findOneAndUpdate(
        { id: "lamp1" },
        {
          status: Number(message) === 1 ? "on" : "off",
          $push: {
            lampRecord: {
              value: Number(message),
              time: new Date(),
            },
          },
        }
      );
      break;
    case "dadn-fan-1":
      await Fan.findOneAndUpdate(
        { id: "fan1" },
        {
          intensity: Number(message),
          $push: {
            fanRecord: {
              value: Number(message),
              time: new Date(),
            },
          },
        }
      );
      break;
    case "dadn-humi-1":
      await Humi.findOneAndUpdate(
        { id: "humi1" },
        {
          value: Number(message),
          $push: {
            humiRecord: {
              value: Number(message),
              time: new Date(),
            },
          },
        }
      );
      break;
    case "dadn-temp-1":
      await Temp.findOneAndUpdate(
        { id: "temp1" },
        {
          value: Number(message),
          $push: {
            tempRecord: {
              value: Number(message),
              time: new Date(),
            },
          },
        }
      );
      break;
    case "dadn-gas":
      const gas = await Gas.findOneAndUpdate(
        { id: "gas1" },
        {
          value: Number(message),
          $push: {
            gasRecord: {
              value: Number(message),
              time: new Date(),
            },
          },
        }
      );
      if (Number(message) > 600) {
        const timestamp = new Date(gas.updatedAt);
        const options = { timeZone: "Asia/Bangkok" };
        const convertedTimestamp = timestamp.toLocaleString("en-US", options);
        await sendEmail("gas", message, convertedTimestamp);
        global.io.emit("turn_gas_on", message.toString());
      }
      break;
    default:
      break;
  }
  global.io.in(topic.toString()).emit(topic.toString(), message.toString());
});

//PORT
const PORT = process.env.PORT || 8080;

//run listen
server.listen(PORT);
/** Event listener for HTTP server "listening" event. */
server.on("listening", () => {
  console.log(`Listening on PORT:: http://localhost:${PORT}`);
});
