const userRoles = require('../api/user/user.enum');

exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('LOAINGUOIDUNG').del()
    .then(() =>
      // Inserts seed entries
      knex('LOAINGUOIDUNG').insert([
        { MALOAINGUOIDUNG: 1, TENLOAI: userRoles.rolesMap.admin },
        { MALOAINGUOIDUNG: 2, TENLOAI: userRoles.rolesMap.vip },
        { MALOAINGUOIDUNG: 3, TENLOAI: userRoles.rolesMap.client },
      ]));
};
