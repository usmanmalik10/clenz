const express = require('express');
const { getAvailableSlots, bookOrder, getAllpending, getAllCompleted, bookConfirm, upDateOrderStatus } = require("../Controllers/order")
const auth = require('../utility/auth')
const router = express.Router();

router.post('/book-order', bookOrder)
router.post('/booknow',bookConfirm)
router.get('/getslots', getAvailableSlots)
router.get('/getpending', auth, getAllpending)
router.get('/getcompleted', auth, getAllCompleted)
router.patch('/update-status/:orderId', auth, upDateOrderStatus)




module.exports = router;