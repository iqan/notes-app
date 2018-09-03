const usersServices = require('./users.services');

const register = (req, res) => {
  const user = req.body;
  usersServices.register(user)
    .then((result) => {
      res.status(result.status).json({ userInfo: result.userInfo.userName });
    })
    .catch((error) => {
      res.status(error.status).json(error);
    });
}

const login = (req, res) => {
  const user = req.body;
  usersServices.login(user)
    .then((result) => {
      res.status(result.status).json({ user: result.user, token: result.token });
    })
    .catch((error) => {
      console.log(error);
      res.status(error.status).json(error);
    });
}

const isAuthenticated = (req, res) => {
  res.status(200).json({ isAuthenticated: true });
}

module.exports = {
  register,
  login,
  isAuthenticated
}
