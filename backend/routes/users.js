const router = require('express').Router();
const {
  getUsers, getUser, updateUserProfile, updateUserAvatar, getCurrentUser,
} = require('../controllers/users');
const {
  validateGetUserId, validateUpdateProfile, validateUpdateAvatar,
} = require('../middlewares/validate');

router.get('/', getUsers);
router.get('/me', getCurrentUser);
router.get('/:userId', validateGetUserId, getUser);
router.patch('/me', validateUpdateProfile, updateUserProfile);
router.patch('/me/avatar', validateUpdateAvatar, updateUserAvatar);

module.exports = router;
