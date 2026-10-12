import User from "./auth.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { OAuth2Client } from 'google-auth-library';

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

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
    { email: user.email, id: user._id, role: user.role },
    process.env.JWT_SECRET,
  );

  const userWithoutPassword = user.toObject();
  delete userWithoutPassword.password;

  return { user: userWithoutPassword, token };
};

// ==== signin ===
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
    { email: user.email, id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "7d" },
  );

  const userWithoutPassword = user.toObject();
  delete userWithoutPassword.password;

  return { user: userWithoutPassword, token };

};

//  === Google Authentication ====
const googleSignin = async (credential) => {
  if (!credential) {
    throw new Error("Google credential is required");
  }

  const ticket = await googleClient.verifyIdToken({
    idToken: credential,
    audience: process.env.GOOGLE_CLIENT_ID,
  });

  const payload = ticket.getPayload();

  if (!payload) {
    throw new Error("Invalid Google token");
  }

  const {
    sub: googleId,
    email,
    email_verified: emailVerified,
    name,
    picture,
  } = payload;

  if (!email || !emailVerified) {
    throw new Error("Google email could not be verified");
  }

  let user = await User.findOne({
    googleId
  });

  if (!user) {
    user = await User.findOne({
      email
    });

    if (user) {
      user.googleId = googleId;

      if (picture && !user.profilePicture) {
        user.profilePicture = picture;
      }

      await user.save();
    } else {
      user = await User.create({
        name: name || email.split("@")[0],
        email,
        googleId,
        profilePicture: picture,
        role: "user",
      });
    }
  }

  const token = jwt.sign(
    {
      email: user.email,
      id: user._id,
      role: user.role,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "7d",
    }
  );

  const userWithoutPassword = user.toObject();

  delete userWithoutPassword.password;

  return {
    user: userWithoutPassword,
    token,
  };
};

export default {
  signup,
  signin,
  googleSignin
};