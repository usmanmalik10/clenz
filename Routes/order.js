const express = require('express');
const { getAvailableSlots, booknow } = require("../Controllers/order")
const router = express.Router();

router.post('/book-order', booknow)
router.get('/getslots', getAvailableSlots)




module.exports = router;