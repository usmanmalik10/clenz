const Order = require("../Models/order");
const Slot = require("../Models/slots");
const Booking = require("../Models/booking");
const sendMailer = require("../utility/mailer");

exports.bookOrder = async (req, res) => {
  try {
    const { userId, service, date, time, price, slotNumber } = req.body;
  
    if (req.body) {
      const data = await Order.create({
        userId,
        service: service,
        date,
        time,
        price: price,
        status: "pending",
      });
      data.save();
      if (data) {
        // const slot = await Slot.create({
        //   orderId: data._id,
        //   date: date,
        //   slotNumber: slotNumber,
        //   isAvailable: false,
        // });
        // await slot.save();
        // let booking = await Booking.create({
        //   slotId: slot._id,
        //   date: date,
        // });
        // booking.save();
      }
      res.status(200).json({
        message: "order confirm",
        data: data,
      });
    } else {
      res.status(400).json({
        message: "No Content",
      });
    }
  } catch (error) {
    console.log('error', error);

    res.status(500).json({
      Error_Message: error,
    });
  }
};

exports.bookConfirm = async (req, res) => {
  try {
    const data = await Slot.create({
      orderId: req.body.orderId,
      date: req.body.date,
      slotNumber: req.body.slotNumber,
      isAvailable: false,
    });
    await data.save();
    let booking;
    console.log("data", data);
    if (data) {
      booking = await Booking.create({
        slotId: data._id,
        date: req.body.date,
      });
    }
    console.log(booking);
    if (data && booking) {
      res.status(200).json({
        status: true,
        message: "booking confirm",
        data,
      });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getAllCompleted = async (req, res) => {
  try {
    const slots = await Order.aggregate([
      {
        $match: { status: "completed" },
      },
      {
        $lookup: {
          from: "users",
          localField: "userId",
          foreignField: "_id",
          as: "user",
        },
      },
      {
        $unwind: '$user'
      }
    ]);
    if (slots) {
      res.status(200).json({
        message: "all Completed orders",
        slots: slots,
      });
    } else {
      res.status(400).json({
        message: "somthing wents wrong",
      });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getAllpending = async (req, res) => {
  try {
    let slots = await Order.aggregate([
      {
        $match: { status: "pending" },
      },
      {
        $lookup: {
          from: "users",
          localField: "userId",
          foreignField: "_id",
          as: "user",
        },
      },
      {
        $unwind: '$user'
      }
    ]);
    if (slots) {
      res.status(200).json({
        message: "All pending order",
        slots: slots,
      });
    } else {
      res.status(400).json({
        message: "something wenst wrong",
      });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getAvailableSlots = async (req, res) => {
  try {
    const data = await getAvailabilitySlotsForMonth(
      req.params.year,
      req.params.month
    );
    res.status(200).json({
      message: "available slots",
      data,
    });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.upDateOrderStatus = async (req, res) => {
  try {
    const data = await Order.findOneAndUpdate(
      { _id: req.params.orderId },
      { $set: { status: "completed" } },
      { returnOriginal: false }
    );
    res.status(200).json({
      status: true,
      message: "success",
    });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};


exports.getCount = async (req, res) => {
  try {
    const pending = await Order.count({status: 'pending'})
    const completed = await Order.count({status: 'completed'})

    res.status(200).json({
      completed: completed,
      pending: pending,
      total: completed + pending
    });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

async function getAvailabilitySlotsForMonth(year, month) {
  const startDate = new Date(year, month - 1, 1); // Set the start date to the first day of the month
  const endDate = new Date(year, month, 0); // Set the end date to the last day of the month

  // Find all slots within the specified month
  const slots = await Slot.find({
    date: { $gte: startDate, $lte: endDate },
  }).sort({ date: 1 });

  const availabilitySlots = {}; // Object to store availability slots data

  // Initialize all slots as unavailable for each day
  const daysInMonth = endDate.getDate();
  for (let day = 1; day <= daysInMonth; day++) {
    const dateKey = `${year}-${month.toString().padStart(2, "0")}-${day
      .toString()
      .padStart(2, "0")}`;
    availabilitySlots[dateKey] = Array.from({ length: 8 }, (_, index) => ({
      slotNumber: index + 1,
      isAvailable: false,
    }));
  }

  // Update availability based on retrieved slots
  slots.forEach((slot) => {
    const dateKey = slot.date.toISOString().slice(0, 10); // Use the date as the key (YYYY-MM-DD format)
    if (availabilitySlots[dateKey]) {
      const slotIndex = slot.slotNumber - 1;
      availabilitySlots[dateKey][slotIndex].isAvailable = true;
    }
  });

  return availabilitySlots;
}
