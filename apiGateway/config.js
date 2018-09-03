let config = {
  WWW_PORT: (process.env.PORT || 3000),
  USER_PROFILE_URL: (process.env.USER_PROFILE_URL || 'http://localhost:3001')
}

module.exports = config;