const express = require('express');
const { getAvailableSlots, bookOrder, getAllpending, getAllCompleted, upDateOrderStatus, getCount } = require("../Controllers/order")
const auth = require('../utility/auth')
const router = express.Router();

router.post('/book-order', bookOrder)
// router.post('/booknow',bookConfirm)
router.get('/getslots/:year/:month', getAvailableSlots)
router.get('/getpending', getAllpending)
router.get('/getcompleted', getAllCompleted)
router.get('/getcount', getCount)
router.patch('/update-status/:orderId', upDateOrderStatus)




module.exports = router;