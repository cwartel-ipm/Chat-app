import http from "http";
import WebSocket from "ws";
import express from "express";
import webpack from "webpack";
import webpackMiddleware from "webpack-dev-middleware";
import webpackHotMiddleware from "webpack-hot-middleware";
import { connectToMongoDB } from "./mongoDBConnection";
import webpackConfig from "../webpack.config.dev";
const ObjectId = require("mongodb").ObjectId;

const compiler = webpack(webpackConfig);
const app = express();


app.use(webpackMiddleware(compiler));
app.use(
  webpackHotMiddleware(compiler, {
    hot: true,
    publicPath: webpackConfig.output.publicPath,
    noInfo: true
  })
);
app.get("*", app.use(express.static("public")));
const httpServer = http.createServer(app);

const wss = new WebSocket.Server({ server: httpServer });

wss.on("connection", async function connection(ws) {
  //1.Connect to mongodb
  const collection = await connectToMongoDB({
    dbName: "test",
    collName: "chat"
  });
  try {
    //2. Get chat data from mongodb
    const data = await collection.find().toArray();
    //3. send initial chat data to connected client
    ws.send(JSON.stringify(data));
    //   console.log("data",data)
  } catch (err) {
    console.log(err);
  }

  //2. Send data from db to connected client

  console.log("connected");
  ws.on("message", async function incoming(message) {
    const parsedMessage = JSON.parse(message);
    //3.insert message to mongodb
    try {
      const newMessageId = await collection.insertOne(parsedMessage);
      //4.broadcast data to relevant clients
      ws.send(
        JSON.stringify({
          ...parsedMessage,
          _id: ObjectId(newMessageId.insertedId).toString()
        })
      );
      console.log(
        "received: %s",
        typeof ObjectId(newMessageId.insertedId).toString()
      );
    } catch (err) {
      console.log("insert error", err);
    }
  });
});

httpServer.listen(3000, () => {
  console.log("listening on port 3000..");
});

// "start": "nodemon src/index.js localhost 8080",
