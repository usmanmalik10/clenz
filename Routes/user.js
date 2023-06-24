const express = require('express');
const auth = require('../utility/auth');
const { addUserInfo, getUserById, getAllUser, userlogin, deleteUser } = require('../Controllers/user');
const router = express.Router();

router.post('/register', addUserInfo);
router.post('/getUserbyid', getUserById);
router.get('/getallusers', getAllUser);
router.post('/login', userlogin);
router.post('/deletuser', auth, deleteUser)




module.exports = router;