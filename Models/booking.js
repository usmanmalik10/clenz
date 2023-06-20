const mongoose = require("mongoose");

const bookingSchema = mongoose.Schema({
    slotId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Slot",
      },
      date:{
        type: Date,
      },
});
module.exports = mongoose.model("booking", bookingSchema);
