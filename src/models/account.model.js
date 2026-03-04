const mongoose = require("mongoose");

const accountSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "account must be associated with a user"],
    index: true,
  },
  status: {
    enum: {
      values: ["active", "closed", "frozen"],
      message: "Status must be either active, closed, or frozen",
    },
  },
  currency:{
    type: String,
    required: [true, "Currency is required for creating an account"],
    default: "PKR",
  }
}, { timestamps: true });


const accountModel = mongoose.model("Account", accountSchema);

module.exports = accountModel;
