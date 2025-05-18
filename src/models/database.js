let notifications = [];

const saveNotification = (notification) => {
  notifications.push(notification);
  console.log("Saved notification");
  console.log(notifications);
};

const getNotificationsByUser = (userId) => {
  return notifications.filter((n) => n.userId === userId);
};

const updateStatus = (nId, currStatus) => {
  const indexOfNotification = notifications.findIndex((ele) => ele.id === nId);
  if (indexOfNotification === -1) {
    console.error(`❌ Notification with ID ${nId} not found`);
    return;
  }
  notifications[indexOfNotification] = {
    ...notifications[indexOfNotification],
    status: currStatus
  }
  console.log(notifications);
}

export { saveNotification, getNotificationsByUser, updateStatus };