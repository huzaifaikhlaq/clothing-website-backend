import User from "./auth.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// === signup ===
const signup = async (userData) => {

  // Check email
  const existingUser = await User.findOne({ email: userData.email });

  if (existingUser) {
    throw new Error("Email already exists");
  }

  // Hash password
  const hasedPassword = await bcrypt.hash(userData.password, 10);

  // Create user
  const user = await User.create({
    ...userData,
    password: hasedPassword
  })

  // create token
  const token = jwt.sign(
    { email: user.email, id: user._id },
    process.env.JWT_SECRET,
  );

  const userWithoutPassword = user.toObject();
  delete userWithoutPassword.password;

  return { user: userWithoutPassword, token };
};

const signin = async (userData) => {

  // check user exists
  const user = await User.findOne({ email: userData.email });

  if (!user) {
    throw new Error("Invalid email or password");
  }

  // Compare password
  const isPasswordCorrect = await bcrypt.compare(
    userData.password,
    user.password
  );

  if (!isPasswordCorrect) {
    throw new Error("Invalid email or password");
  }

  // genrate JWT token
  const token = jwt.sign(
    { email: user.email, id: user._id },
    process.env.JWT_SECRET,
  );

  const userWithoutPassword = user.toObject();
  delete userWithoutPassword.password;

  return { user: userWithoutPassword, token };

};

export default {
  signup,
  signin,
};