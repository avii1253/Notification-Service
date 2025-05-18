import express from "express";
import morgan from "morgan";
import notificationRouter from "./routes/notificationRouter.js";

import '../src/queues/notificationQueue.js';

const app = express();

app.use(morgan("combined"));
app.use(express.json());

console.log("Entered app.js");


app.use("/notifications", notificationRouter);

export default app;
