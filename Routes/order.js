const express = require('express');
const { getAvailableSlots, booknow, getAllpending, getAllCompleted } = require("../Controllers/order")
const router = express.Router();

router.post('/book-order', booknow)
router.get('/getslots', getAvailableSlots)
router.get('/getpending', getAllpending)
router.get('/getcompleted', getAllCompleted)




module.exports = router;