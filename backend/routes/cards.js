const router = require('express').Router();
const {
  createCard, getCards, deleteCard, likeCard, dislikeCard,
} = require('../controllers/cards');
const {
  validateCreateCard, validateCardId,
} = require('../middlewares/validate');

router.get('/', getCards);
router.post('/', validateCreateCard, createCard);
router.delete('/:cardId', validateCardId, deleteCard);
router.delete('/:cardId/likes', validateCardId, dislikeCard);
router.put('/:cardId/likes', validateCardId, likeCard);

module.exports = router;
