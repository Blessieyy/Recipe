import User from "../models/user.js";  
import bcrypt from "bcrypt";
import generateToken from "../utils/index.js";

const registerUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({
        error: "User Already Exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      id: newUser._id,
      email: newUser.email,
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      res.status(400).json({ error: error.message });
    } else {
      res.status(500).json({ error: error.message });
    }
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: "Invalid login credentials" });
    }

    
    console.log("Entered Password:", password);
    console.log("Stored Hash:", user.password);

    
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(401).json({ error: "Invalid login credentials" });
    }

    const token = generateToken(user._id);

    res.status(200).json({
      id: user._id,
      email: user.email,
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export default { registerUser, loginUser };
