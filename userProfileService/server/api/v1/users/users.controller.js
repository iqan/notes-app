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
      res.status(error.status).json(error);
    });
}

const isAuthenticated = (req, res) => {
  res.status(200).json({ isAuthenticated: true });
}

const getByUserName = (req, res) => {
  const userName = req.params.username;
  usersServices.getByUserName(userName)
    .then((result) => {
      res.status(result.status).json(result.user);
    })
    .catch((error) => {
      res.status(error.status).json(error);
    });
}

const getAll = (req, res) => {
  usersServices.getAll()
    .then((result) => {
      res.status(result.status).json(result.users);
    })
    .catch((error) => {
      res.status(error.status).json(error);
    });
}

module.exports = {
  register,
  login,
  isAuthenticated,
  getByUserName,
  getAll
}
