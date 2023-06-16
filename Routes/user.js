const express = require('express');
const auth = require('../utility/auth');
const { addUserInfo, verifiedUsers, getUserById, getAllUser, EditUserInfo, changePassword, userlogin, followingAndfollwer, unFollowingAndFollwer, forgetPassword, resetPassword, deleteUser,  followingfaviourtNews, unfollowingfaviourtNews, populateFaviourNews } = require('../Controllers/user');
const router = express.Router();

router.post('/register', addUserInfo);
router.post('/checkotp', verifiedUsers);
router.post('/getUserbyid', auth, getUserById);
router.get('/getallusers', auth, getAllUser);
router.post('/updateuserinfo', auth, EditUserInfo);
router.post('/changepassword', auth, changePassword);
router.post('/userlogin', userlogin);
router.post('/deletuser', auth, deleteUser)
router.post('/follow/:id', auth, followingAndfollwer);
router.post('/unfollowing/:id', auth, unFollowingAndFollwer);
router.post('/forgetpassword', forgetPassword);
router.post('/resetpassword', resetPassword);
router.post('/followfaviourtnews', auth, followingfaviourtNews);
router.post('/unfollownews', auth, unfollowingfaviourtNews);


module.exports = router;