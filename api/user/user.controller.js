const authService = require('../../services/auth.service');
const _ = require('lodash');
const conn = require('../../services/database.js');

const UserController = () => {
  const register = async (req, res) => {
    const { email, password, password2 } = req.body;
    if (password === password2) {
      try {} catch (e) {}
    }
  };
  return {
    register,
  };
};
module.exports = UserController;
