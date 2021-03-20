const authService = require('../../services/auth.service');
const bcryptService = require('../../services/bcrypt.service');
const _ = require('lodash');
const conn = require('../../services/database.js');

const UserController = () => {
  const register = async (req, res) => {
    const {
      email, password, password2,
    } = req.body;
    if (password === password2) {
      try {
        const hashedPassword = await bcryptService().password(password);
        const user = await conn('NGUOIDUNG').insert({ EMAIL: email, MATKHAU: hashedPassword }).returning('TAIKHOAN', 'MALOAINGUOIDUNG');
        console.log(user);
        const token = authService().issue({ user });
        return res.status(200).json({ token });
      } catch (e) {
        console.log(e);
        return res.status(500).json({ msg: 'Failed to register' });
      }
    }
    return res.status(400).json({ msg: 'Bad Request: Passwords don\'t match' });
  };
  const login = async (req, res) => {
    const { email, password } = req.body;
    if (email && password) {
      try {
        const user = await conn('NGUOIDUNG').where('EMAIL', email).select('TAIKHOAN', 'MATKHAU', 'MALOAINGUOIDUNG', 'EMAIL');
        if (user.length === 0) res.status(400).json({ msg: 'Email or password is wrong' });
        // Các service của brcypt
        const isMatched = await bcryptService().comparePassword(password, user[0].MATKHAU);
        if (isMatched) {
          // Các service của auth cho việc auth, tạo token,...
          const payload = _.pick(user[0], ['TAIKHOAN', 'EMAIL', 'MALOAINGUOIDUNG']);
          const token = authService().issue({ payload });
          return res.status(200).json({ token });
        }

        return res.status(401).json({ msg: 'Unauthorized' });
      } catch (e) {
        console.log(e);
        return res.status(500).json({ msg: 'Internal server error' });
      }
    }
    return res.status(400).json({ msg: 'Bad Request: Email or password is wrong' });
  };
  const layDanhSachNguoiDung = async (req, res) => {
    try {
      const users = await conn('NGUOIDUNG').select('*');
      return res.status(200).json({ users });
    } catch (e) {
      return res.status(404).json({ msg: e });
    }
  };
  return {
    register,
    login,
    layDanhSachNguoiDung,
  };
};
module.exports = UserController;
