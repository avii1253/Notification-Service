// notificationRouter.js
import express from "express";
import {
  sendNotificationC,
  getUserNotificationC
} from "../controllers/notificationController.js";

const notificationRouter = express.Router();

console.log("Router initialized");

// Route: POST /notifications
notificationRouter.post("/", sendNotificationC);

// Route: GET /notifications/user/:userId (custom route for user notifications)
notificationRouter.get("/user/:userId", getUserNotificationC);

export default notificationRouter;
