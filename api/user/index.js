/* eslint-disable max-len */
const express = require('express');
const controller = require('./user.controller');
// const { validateUserUpdate } = require('./user.validator');

const userController = controller();

const authService = require('../../services/auth.service');

const auth = authService();

const router = express.Router();
router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/user-list', auth.authenticate, auth.authorize(['admin', 'client']), userController.layDanhSachNguoiDung);
// router.get('/user-list-pagination', auth.authenticate, auth.authorize(['admin']), userController.layDanhSachNguoiDungPhanTrang);
// router.get('/:taiKhoan', auth.authenticate, auth.authorize(['admin', 'client']), userController.layThongTinTaiKhoan);
// router.patch('/user-update', auth.authenticate, auth.authorize(['admin', 'client']), validateUserUpdate, userController.capNhatThongTinNguoiDung);
// router.delete('/:taiKhoan', auth.authenticate, auth.authorize(['admin']), userController.xoaNguoiDung);

module.exports = router;
