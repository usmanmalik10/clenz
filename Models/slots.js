const mongoose = require("mongoose");

const slotSchema = mongoose.Schema({
  order: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "Order",
  },
  date:{
    type: Date,
  },
  slotNumber: Number,
  isAvailable: { type: Boolean, default: true },
});
module.exports = mongoose.model("Slot", slotSchema);
