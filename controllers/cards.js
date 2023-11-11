const Card = require('../models/card');
const {
  BAD_REQUEST_STATUS,
  SERVER_ERROR_STATUS,
  NOT_FOUND_STATUS,
  CREATED_STATUS,
  SUCCESS_STATUS,
} = require('../utils/constants');

module.exports.getCards = async (req, res) => {
  try {
    const cards = await Card.find({});
    return res.status(SUCCESS_STATUS).send(cards);
  } catch (error) {
    return res
      .status(SERVER_ERROR_STATUS)
      .send({ message: 'Ошибка на стороне сервера' });
  }
};

module.exports.createCard = async (req, res) => {
  try {
    const newCard = await new Card(req.body);
    newCard.owner = req.user._id;

    return res.status(CREATED_STATUS).send(await newCard.save());
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(BAD_REQUEST_STATUS).send({
        message: ' Переданы некорректные данные при создании карточки.',
      });
    }
    return res
      .status(SERVER_ERROR_STATUS)
      .send({ message: 'Ошибка на стороне сервера' });
  }
};

module.exports.deleteCard = async (req, res) => {
  try {
    const delCard = await Card.findByIdAndRemove(req.params.cardId);

    if (!delCard) {
      throw new Error('NotFound');
    }

    return res.status(SUCCESS_STATUS).send(delCard);
  } catch (error) {
    if (error.name === 'CastError') {
      return res
        .status(NOT_FOUND_STATUS)
        .send({ message: 'Передан неправильный _id.' });
    }
    if (error.message === 'NotFound') {
      return res
        .status(NOT_FOUND_STATUS)
        .send({ message: 'Карточка с указанным _id не найдена.' });
    }
    return res
      .status(SERVER_ERROR_STATUS)
      .send({ message: 'Ошибка на стороне сервера' });
  }
};

module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((like) => {
      if (!like) {
        throw new Error('NotFound');
      }

      return res.status(CREATED_STATUS).send(like);
    })
    .catch((error) => {
      if (error.name === 'CastError') {
        return res
          .status(BAD_REQUEST_STATUS)
          .send({ message: 'Передан некорректный _id карточки.' });
      }
      if (error.message === 'NotFound') {
        return res
          .status(NOT_FOUND_STATUS)
          .send({ message: 'Передан несуществующий _id карточки.' });
      }

      return res
        .status(SERVER_ERROR_STATUS)
        .send({ message: 'Ошибка на стороне сервера' });
    });
};

module.exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((like) => {
      if (!like) {
        throw new Error('NotFound');
      }

      return res.status(SUCCESS_STATUS).send(like);
    })
    .catch((error) => {
      if (error.name === 'CastError') {
        return res
          .status(BAD_REQUEST_STATUS)
          .send({ message: 'Передан некорректный _id карточки.' });
      }
      if (error.message === 'NotFound') {
        return res
          .status(NOT_FOUND_STATUS)
          .send({ message: 'Передан несуществующий _id карточки.' });
      }

      return res
        .status(SERVER_ERROR_STATUS)
        .send({ message: 'Ошибка на стороне сервера' });
    });
};
