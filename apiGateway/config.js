let config = {
  WWW_PORT: (process.env.PORT || 3000),
  USER_PROFILE_URL: (process.env.USER_PROFILE_URL || 'http://localhost:3001'),
  NOTES_URL: (process.env.NOTES_URL || 'http://localhost:3002')
}

module.exports = config;