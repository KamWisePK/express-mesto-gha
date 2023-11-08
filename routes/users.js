const router = require('express').Router();
const {
  getUsers,
  createUser,
  getUserById,
  changeUserData,
  changeUserAvatar,
} = require('../controllers/users');

router.post('/users', createUser);
router.get('/users', getUsers);
router.get('/users/:id', getUserById);
router.patch('/users/me', changeUserData);
router.patch('/users/me/avatar', changeUserAvatar);
module.exports = router;
