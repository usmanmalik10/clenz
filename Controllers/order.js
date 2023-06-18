const Order = require('../Models/order')
const sendMailer = require('../utility/mailer');



exports.booknow = async (req, res) => {
    try {
        const { username, service, date, time, price, status, venu } = req.body;
        if (req.body) {
            const data = await Order.create({
                username,
                service, 
                date,
                time, 
                price, 
                status, 
                venu
            })
            data.save();
            return res.status(200).json({
                message: 'order confirm',
                data
            })
        } else {
            res.status(400).json({
                message: 'No Content'
            })
        }
    } catch (error) {
        res.status(500).json({
            Error_Message: error
        })
    }
};

exports.getAvailableSlots = async (req, res) => {
  console.log('true');
    const { date } = req.query;
  try {
    const slots = await Order.count({date:date,  status: "pending"})
    if(slots < 9 ) {
      res.status(200).json({
        message:"slots are available",
        count: slots
      });
    } else {
      res.status(200).json({
        message:"slots are not available",
        count: slots
      });
    }
    
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

exports.getAllCompleted = async (req, res) => {
  try {
    const slots = await Order.find({ status: "completed"})
    if(slots) {
      res.status(200).json({
        message:"slots are available",
        slots: slots,
        count: slots.length
      });
    } else {
      res.status(400).json({
        message:"slots are not available"
      });
    }
    
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

exports.getAllpending = async (req, res) => {
  try {
    const slots = await Order.find({ status: "pending"})
    if(slots) {
      res.status(200).json({
        message:"slots are available",
        slots: slots,
      });
    } else {
      res.status(400).json({
        message:"slots are not available"
      });
    }
    
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}