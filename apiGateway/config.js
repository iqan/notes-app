let config = {
  WWW_PORT: (process.env.PORT || 3000),
  USER_PROFILE_URL: (process.env.USER_PROFILE_URL || 'http://localhost:3001'),
  NOTES_URL: (process.env.NOTES_URL || 'http://localhost:3002'),
  NOTIFICATIONS_API_URL: (process.env.NOTIFICATIONS_API_URL || 'http://localhost:3003')
}

module.exports = config;