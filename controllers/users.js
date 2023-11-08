const User = require('../models/user');
const { errorName, errorCode } = require('../utils/constants');

module.exports.getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    return res.send({ users, message: 'Список пользователей' });
  } catch (error) {
    return res
      .status(errorCode.serverError)
      .send({ message: errorName.serverError });
  }
};

module.exports.getUserById = async (req, res) => {
  try {
    const { userId } = req.params;
    const users = await User.findById(userId);
    if (!userId) {
      return res
        .status(errorCode.notFound)
        .send({ message: errorName.notFound });
    }
    return res.send(users);
  } catch (error) {
    return res
      .status(errorCode.serverError)
      .send({ message: errorName.serverError });
  }
};

module.exports.createUser = (req, res) => {
  try {
    const newUser = new User(req.body);
    if (!newUser) {
      return res
        .status(errorCode.badRequest)
        .send({ message: errorName.badRequest });
    }
    return res.status(201).send(newUser.save());
  } catch (error) {
    return res.status(500).send(error.message);
  }
};
module.exports.changeUserData = async (req, res) => {
  try {
    const { name, about } = req.body;
    const userData = await User.findByIdAndUpdate(
      req.user._id,
      {
        name,
        about,
      },
      { new: true, runValidators: true },
    );
    if ((!name, about)) {
      return res
        .status(errorCode.notFound)
        .send({ message: errorName.notFound });
    }
    return res.send(userData);
  } catch (err) {
    if (err.name === 'CastError') {
      return res
        .status(errorCode.badRequest)
        .send({ message: errorName.badRequest });
    }
    return res
      .status(errorCode.serverError)
      .send({ message: errorName.serverError });
  }
};
// module.exports.changeUserData = async (req, res) => {
//   try {
//     const { name, about } = req.body;
//     const userData = await User.findByIdAndUpdate(
//       req.user._id,
//       {
//         name,
//         about,
//       },
//       { new: true, runValidators: true }
//     );
//     return res.send(userData);
//   } catch (err) {
//     return res.status(500).send(err.message);
//   }
// };

module.exports.changeUserAvatar = async (req, res) => {
  try {
    const { avatar } = req.body;
    const userAvatar = await User.findByIdAndUpdate(
      req.user._id,
      {
        avatar,
      },
      { new: true, runValidators: true },
    );
    if (!userAvatar) {
      return res
        .status(errorCode.notFound)
        .send({ message: errorName.notFound });
    }
    return res.send(userAvatar);
  } catch (err) {
    if (err.name === 'CastError') {
      return res
        .status(errorCode.badRequest)
        .send({ message: errorName.badRequest });
    }
    return res
      .status(errorCode.serverError)
      .send({ message: errorName.serverError });
  }
};
// module.exports.changeUserAvatar = async (req, res) => {
//   try {
//     const { avatar } = req.body;
//     if (!avatar) {
//       throw new mongoose.Error.CastError();
//     }
//     const user = await User.findById(req.user._id);
//     if (!user) {
//       throw new mongoose.Error.ValidationError();
//     }
//     const userAvatar = await User.findByIdAndUpdate(
//       req.user._id,
//       {
//         avatar,
//       },
//       { new: true, runValidators: true }
//     );
//     return res.send(userAvatar);
//   } catch (err) {
//     return res.status(status).send({ message });
//   }
// };
