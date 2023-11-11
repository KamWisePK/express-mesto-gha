const Card = require('../models/card');
const {
  BAD_REQUEST_STATUS,
  SERVER_ERROR_STATUS,
  NOT_FOUND_STATUS,
  CREATED_STATUS,
  SUCCESS_STATUS,
} = require('../utils/constants');

module.exports.createCard = (req, res) => {
  try {
    const { name, link } = req.body;
    const newCard = new Card({ name, link, owner: req.user._id });
    if (!newCard) {
      return res
        .status(BAD_REQUEST_STATUS)
        .send({
          message: 'Переданы некорректные данные при создании карточки.',
        });
    }
    return res.status(CREATED_STATUS).send(newCard);
  } catch (err) {
    return res.status(SERVER_ERROR_STATUS).send({ message: err.Message });
  }
};

module.exports.getCards = async (req, res) => {
  try {
    const cards = await Card.find({});
    return res.status(SUCCESS_STATUS).send(cards);
  } catch (err) {
    return res.status(SERVER_ERROR_STATUS).send({ message: err.Message });
  }
};

module.exports.deleteCard = async (req, res) => {
  try {
    const cards = await Card.findByIdAndDelete(req.params.cardId);
    if (!cards) {
      return res
        .status(NOT_FOUND_STATUS)
        .send({
          message: 'Карточка с указанным _id не найдена.',
        });
    }
    return res.send({ cards, message: 'Карточка удалена' });
  } catch (err) {
    return res.status(SERVER_ERROR_STATUS).send({ message: err.Message });
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
        .status(NOT_FOUND_STATUS)
        .send({ message: 'Передан несуществующий _id карточки.' });
    }
    return res.send({ likedCard, message: 'Лайк успешно поставлен' });
  } catch (err) {
    if (err.name === 'CastError') {
      return res
        .status(BAD_REQUEST_STATUS)
        .send({ message: 'Переданы некорректные данные для постановки лайка' });
    }
    return res
      .status(SERVER_ERROR_STATUS)
      .send({ message: err.Message });
  }
};

module.exports.dislikeCard = async (req, res) => {
  try {
    const dislikedCard = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $pull: { likes: req.user._id } },
      { new: true },
    );
    if (!dislikedCard) {
      return res
        .status(NOT_FOUND_STATUS)
        .send({ message: 'Передан несуществующий _id карточки.' });
    }
    return res.send({ dislikedCard, message: 'Лайк успешно убран' });
  } catch (err) {
    if (err.name === 'CastError') {
      return res
        .status(BAD_REQUEST_STATUS)
        .send({ message: 'Переданы некорректные данные для постановки лайка' });
    }
    return res
      .status(SERVER_ERROR_STATUS)
      .send({ message: err.Message });
  }
};
