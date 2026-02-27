const mongoose = require("mongoose");
const bycrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: { value: true, message: "Email is required" },
      unique: [true, "Email already exists"],
      trim: true,
      lowercase: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please fill a valid email address",
      ],
    },
    name: {
      type: String,
      required: { value: true, message: "Name is required" },
      trim: true,
    },
    password: {
      type: String,
      required: { value: true, message: "Password is required" },
      minlength: [6, "Password must be at least 6 characters long"],
      Select: false,
    },
  },
  { timestamps: true },
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return;
  }
  const hash = await bycrypt.hash(this.password, 10);
  this.password = hash;
  return;
});

userSchema.methods.comparePassword = async function (password) {
  return await bycrypt.compare(password, this.password);
};

const usermodel = mongoose.model("User", userSchema);

module.exports = usermodel;
