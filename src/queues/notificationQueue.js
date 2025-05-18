import Queue from "bull";
import { sendEmail, sendSMS, sendInApp } from '../services/notificationServices.js';
const notificationQueue = new Queue('notifications', 'redis://127.0.0.1:6379');

// Adding a job to the queue
const sendNotificationJob = async (notification) => {
  await notificationQueue.add(notification, {
    attempts: 3,
    backoff: 5000, // it wil retry after 5 seconds
  });
};

// It is a worker
notificationQueue.process(async (job) => {
  const { id, type, userId, channelInfo, content } = job.data;

  try {
    console.log("Worker loaded and listening for jobs");

    if (type === 'email') await sendEmail(id, channelInfo.email, content);
    else if (type === 'sms') sendSMS(channelInfo.phone, content);
    else if (type === 'in-app') sendInApp(userId, content);
    else throw new Error('Invalid type');

    console.log(`Notification sent: ${type}`);
  } catch (err) {
    console.log(`Failed to send ${type}: ${err.message}`);
    throw err; // Retry
  }
});

export { sendNotificationJob };
