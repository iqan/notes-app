const notificationsDao = require('./notifications.dao');

const notifyUser = (req, res) => {
  const userName = '';
  const notification = req.body;
  notificationsDao.addNotification(userName, notification)
    .then(result => res.status(result.status).json(result))
    .catch(err => res.status(err.status).json(err));
}

const getReminders = (req, res) => {
  res.status(403).send('not implemented');
}

const addReminder = (req, res) => {
  res.status(403).send('not implemented');
}

const snoozeReminder = (req, res) => {
  res.status(403).send('not implemented');
}

const dismissReminder = (req, res) => {
  res.status(403).send('not implemented');
}

module.exports = {
  notifyUser,
  getReminders,
  addReminder,
  snoozeReminder,
  dismissReminder
}