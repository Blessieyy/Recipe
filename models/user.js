import mongoose from "mongoose";
import * as bcrypt from "bcrypt";
import validator from "validator";

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: [validator.isEmail, "Please enter a valid email"],
  },
  password: {
    type: String,
    required: true,
    // validate: {
    //   validator: function (value) {
    //     return /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/.test(
    //       value
    //     );
    //   },
    //   message:
    //     "Password must contain at least one uppercase letter, one number, and one special character.",
    // },
  },
});


userSchema.methods.matchPasswords = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

export default mongoose.model("User", userSchema);
