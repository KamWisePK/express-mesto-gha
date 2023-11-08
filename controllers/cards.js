const Card = require('../models/card');
const { errorName, errorCode } = require('../utils/constants');

module.exports.createCard = (req, res) => {
  try {
    const { name, link } = req.body;
    const newCard = new Card({ name, link, owner: req.user._id });
    if (!newCard) {
      return res
        .status(errorCode.badRequest)
        .send({ message: errorName.badRequest });
    }
    return res.status(201).send(newCard.save());
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

module.exports.getCards = async (req, res) => {
  try {
    const cards = await Card.find({});
    return res.send(cards);
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

module.exports.deleteCard = async (req, res) => {
  try {
    const cards = await Card.findByIdAndDelete(req.params.cardId);
    if (!cards) {
      return res
        .status(errorCode.badRequest)
        .send({ message: errorName.badRequest });
    }
    return res.send({ cards, message: 'Карточка удалена' });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

module.exports.likeCard = async (req, res) => {
  try {
    const likedCard = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $pull: { likes: req.user._id } },
      { new: true },
    );
    if (!likedCard) {
      return res
        .status(errorCode.notFound)
        .send({ message: errorName.notFound });
    }
    return res.send({ likedCard, message: 'Лайк успешно поставлен' });
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
// module.exports.likeCard = async (req, res) => {
//   try {
//     const likedCard = await Card.findByIdAndUpdate(
//       req.params.cardId,
//       { $addToSet: { likes: req.user._id } },
//       { new: true },
//     );
//     return res.send({ likedCard, message: 'Лайк успешно поставлен' });
//   } catch (error) {
//     return res.status(500).send(error.message);
//   }
// };

module.exports.dislikeCard = async (req, res) => {
  try {
    const dislikedCard = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $pull: { likes: req.user._id } },
      { new: true },
    );
    if (!dislikedCard) {
      return res
        .status(errorCode.notFound)
        .send({ message: errorName.notFound });
    }
    return res.send({ dislikedCard, message: 'Лайк успешно убран' });
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
