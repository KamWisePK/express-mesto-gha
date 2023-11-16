const router = require('express').Router();

const {
  getUsers,
  getUserById,
  changeUserData,
  changeUserAvatar,
  getMe,
} = require('../controllers/users');

const { validateUserByData, validateUserAvatar, validateUserById } = require('../validation/userValidation');

router.get('/users', getUsers);
router.get('/me', getMe);
router.get('/users/:id', validateUserById, getUserById);
router.patch('/users/me', validateUserByData, changeUserData);
router.patch('/users/me/avatar', validateUserAvatar, changeUserAvatar);
module.exports = router;
