const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      enum: ["MR", "MISS", "MRS"]
    },
    name: {
      type: String,
      required: true
    },
    phone: {
      type: String,
      required: true,
      unique: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    category: {
      type: String,
      default: "regular"
    },
    noOfOrders: {
      type: Number,
      default: 0
    },
    moneyBack: {
      type: Number,
      default: 0
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("customerData", customerSchema);
