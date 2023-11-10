/* eslint-disable object-curly-newline */
const User = require('../models/user');
const NotFoundError = require('../errors/notFoundError');
const ValidError = require('../errors/validationError');
const ConflictError = require('../errors/conflictError');

// GET /users — возвращает всех пользователей
module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch(next);
};

// GET /users/:userId - возвращает пользователя по _id
module.exports.getUserById = (req, res, next) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (!user) {
        return next(new NotFoundError('Пользователь по _id не найден'));
      }
      return res.send({ data: user });
    })
    .catch(next);
};

// POST /users — создаёт пользователя
module.exports.createUser = (req, res, next) => {
  const { name, about, avatar, email } = req.body;
  User.create({
    name,
    about,
    avatar,
    email,
  })
    .then((user) => res.status(201).send({
      name: user.name,
      about: user.about,
      avatar: user.avatar,
      email: user.email,
      _id: user._id,
    }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new ValidError('Введены некорректные данные'));
      } else if (err.code === 11000) {
        next(new ConflictError('Такой пользователь уже существует!)'));
      } else {
        next(err);
      }
    });
};

// PATCH /users/me — обновляет профиль
module.exports.changeUserData = (req, res, next) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    {
      new: true,
      runValidators: true,
    },
  )
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь по указанному _id не найден');
      }
      res.send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new ValidError('Введены некорректные данные'));
      }
      return next(err);
    });
};

// PATCH /users/me/avatar — обновляет аватар
module.exports.changeUserAvatar = (req, res, next) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    {
      new: true,
      runValidators: true,
    },
  )
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь по указанному _id не найден');
      }
      res.send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new ValidError('Введены некорректные данные'));
      }
      return next(err);
    });
};
