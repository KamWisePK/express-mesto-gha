const router = require('express').Router();
const {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');

const { validateCardByData, validateCardById } = require('../validation/cardValidation');

router.post('/cards', validateCardByData, createCard);
router.get('/cards', getCards);
router.delete('/cards/:cardId', validateCardById, deleteCard);
router.put('/cards/:cardId/likes', validateCardById, likeCard);
router.delete('/cards/:cardId/likes', validateCardById, dislikeCard);

module.exports = router;
