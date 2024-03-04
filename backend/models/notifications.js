const mongoose = require('mongoose');

const notificationsSchema = new mongoose.Schema({
  type: { type: String, required: true },
  postType: { type: String },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  post: { type: mongoose.Schema.Types.ObjectId, refPath: 'postType' },
  message: { type: String, required: true },
  date: { type: Date, default: Date.now, required: true },
});

const Notifications = mongoose.model('Notifications', notificationsSchema);

//Create Notification
module.exports.createNotification = async function(type, author, message) {
  try {
    const notification = new Notifications({
      type,
      author,
      message,
    });

    await notification.save();
    return notification;
  } catch (error) {
    throw error;
  }
};

module.exports = Notifications;
