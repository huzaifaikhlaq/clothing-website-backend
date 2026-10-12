
import User from "./auth.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { OAuth2Client } from "google-auth-library";

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const createToken = (user) => {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not configured");
  }

  return jwt.sign(
    {
      email: user.email,
      id: user._id,
      role: user.role,
    },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
};

const removePassword = (user) => {
  const userObject = user.toObject();
  delete userObject.password;
  return userObject;
};

// Email/password signup
const signup = async (userData) => {
  const existingUser = await User.findOne({
    email: userData.email,
  });

  if (existingUser) {
    throw new Error("Email already exists");
  }

  const hashedPassword = await bcrypt.hash(userData.password, 10);

  const user = await User.create({
    ...userData,
    password: hashedPassword,
  });

  return {
    user: removePassword(user),
    token: createToken(user),
  };
};

// Email/password signin
const signin = async (userData) => {
  const user = await User.findOne({
    email: userData.email,
  });

  if (!user) {
    throw new Error("Invalid email or password");
  }

  // Google-only accounts do not have a password hash.
  if (!user.password) {
    throw new Error(
      "This account uses Google sign-in. Continue with Google."
    );
  }

  const isPasswordCorrect = await bcrypt.compare(
    userData.password,
    user.password
  );

  if (!isPasswordCorrect) {
    throw new Error("Invalid email or password");
  }

  return {
    user: removePassword(user),
    token: createToken(user),
  };
};

// Google signin/signup
const googleSignin = async (credential) => {
  if (!credential) {
    throw new Error("Google credential is required");
  }

  if (!process.env.GOOGLE_CLIENT_ID) {
    throw new Error("GOOGLE_CLIENT_ID is not configured");
  }

  // Verify the ID token using Google's servers.
  const ticket = await client.verifyIdToken({
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

  if (!googleId || !email || !emailVerified) {
    throw new Error("Google email could not be verified");
  }

  let user = await User.findOne({ googleId });

  if (!user) {
    // Link Google to an existing account with the same verified email.
    user = await User.findOne({ email });

    if (user) {
      user.googleId = googleId;

      if (picture && !user.profilePicture) {
        user.profilePicture = picture;
      }

      await user.save();
    } else {
      // Create a new Google account.
      user = await User.create({
        name: name || email.split("@")[0],
        email,
        googleId,
        profilePicture: picture,
        role: "user",
      });
    }
  }

  return {
    user: removePassword(user),
    token: createToken(user),
  };
};

export default {
  signup,
  signin,
  googleSignin,
};
