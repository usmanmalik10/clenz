const express = require('express');
const auth = require('../utility/auth');
const { addUserInfo, getAllUser, userlogin, deleteUser, getUserByid } = require('../Controllers/user');
const router = express.Router();

router.post('/register', addUserInfo);
router.get('/:userId', getUserByid);
router.get('/', getAllUser);
router.post('/login', userlogin);
router.post('/deletuser', auth, deleteUser)




module.exports = router;