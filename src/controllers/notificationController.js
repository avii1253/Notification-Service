import { v4 as uuidv4 } from 'uuid';
import { saveNotification, getNotificationsByUser } from '../models/database.js';
import { sendNotificationJob } from '../queues/notificationQueue.js';

const sendNotificationC = async(req, res) => {
    const { userId, type, content, channelInfo } = req.body;

    if (!userId || !type || !content) {
        return res.status(400).json({ error: 'Missing required fields' });
    }
    
    const notification = {
        id: uuidv4(),
        userId,
        type,
        content,
        channelInfo,
        status: 'queued',
        timestamp: new Date().toISOString()
    };


    saveNotification(notification);

    await sendNotificationJob(notification); // Queue it for processing

    res.status(202).json({ message: 'Notification queued successfully' });
}

const getUserNotificationC = (req, res) => {
    const userId = req.params.userId;//storing userID as a string
    const result = getNotificationsByUser(userId);
    res.status(200).json(result);
}

export { sendNotificationC, getUserNotificationC }