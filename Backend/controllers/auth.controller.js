import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import { generateTokenAndSetCookie } from "../utils/generateTokenAndSetCookie.js";
import {
  sendVerificationEmail,
  sendWelcomeEmail,
  sendPasswordForgotEmail,
  sendResetSucessEmail,
} from "../mailtrap/email.js";
import { fail } from "assert";

// * SIGNUP =>
export const signup = async (req, res) => {
  const { email, password, name } = req.body;

  try {
    if (!email || !password || !name) {
      throw new Error("All fields are required");
    }

    const userAlreadyExists = await User.findOne({ email }); // finds if the user exist already in the database
    if (userAlreadyExists) {
      return res
        .status(400)
        .json({ sucess: false, message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const verificationToken = Math.floor(
      100000 + Math.random() * 900000
    ).toString();

    const user = new User({
      email,
      password: hashedPassword,
      name,
      verificationToken,
      verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000, // gives the timestap of 24 hour from now
    });

    await user.save(); // saving to the database

    //jwt
    generateTokenAndSetCookie(res, user._id);

    await sendVerificationEmail(user.email, user.verificationToken);

    res.status(201).json({
      sucess: true,
      message: "User created sucessfully",
      user: {
        ...user._doc,
        password: undefined,
      },
    });
  } catch (error) {
    res.status(400).json({ sucess: false, message: error.message });
  }
};

// * VERIFYINGEMAIL
export const verifyemail = async (req, res) => {
  const { code } = req.body;
  try {
    const user = await User.findOne({
      verificationToken: code,
      verificationTokenExpiresAt: { $gt: Date.now() },
    });
    if (!user) {
      return res.status(400).json({
        sucess: false,
        message: "Invalid or expired verification code",
      });
    }
    user.isVerified = true;
    user.verificationToken = undefined;
    user.verificationTokenExpiresAt = undefined;
    await user.save();

    await sendWelcomeEmail(user.email, user.name);

    res.status(200).json({
      sucess: true,
      message: "Email verified sucessfully",
      user: {
        ...user._doc,
        password: undefined,
      },
    });
  } catch (error) {
    console.log("Error occured while verifiying the email:", error);
    res.send("error occured while verifying the email");
  }
};

// * LOGIN =>
export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    // checking email in database
    const user = await User.findOne({ email });
    // console.log(user);
    if (!user) {
      return res.status(400).json({ sucess: false, message: "Invalid Email" });
    }

    // after email is found comparing the given password with the users database password after bcrypting it
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res
        .status(400)
        .json({ sucess: false, message: "Invalid Password" });
    }

    generateTokenAndSetCookie(res, user._id);

    user.lastLogin = new Date();
    await user.save();

    res.status(200).json({
      sucess: true,
      message: "Sucessfully logged in",
      user: {
        ...user._doc,
        password: undefined,
      },
    });
  } catch (error) {
    console.log("Error in login");
    res.status(400).json({ sucess: false, message: error.message });
  }
};

// * LOGOUT =>
export const logout = (req, res) => {
  res.clearCookie("token");
  res.status(200).json({ sucess: true, message: "Logged out sucessfully." });
};

// * FORGOT PASSWORD
export const forgotpassword = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ sucess: false, message: "User not found." });
    }

    // generateToken
    const resetPasswordToken = crypto.randomBytes(20).toString("hex");
    const resetPasswordExpiresAt = Date.now() + 1 * 60 * 60 * 1000;

    user.resetPasswordToken = resetPasswordToken;
    user.resetPasswordExpiresAt = resetPasswordExpiresAt;

    await user.save();

    //sending resetEmail
    sendPasswordForgotEmail(
      user.email,
      `${process.env.CLIENT_URL}/${resetPasswordToken}`
    );

    res.status(200).json({
      sucess: true,
      message: "Password reset link sent to your email.",
    });
  } catch (error) {
    res.status(400).json({ sucess: false, message: error.message });
  }
};

export const resetPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;
  try {
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpiresAt: { $gt: Date.now() },
    });

    console.log(`User: ${user}`);

    if (!user) {
      return res
        .status(400)
        .json({ sucess: false, message: "Invalid or expired reset token" });
    }
    // update password
    const hashedNewPassword = await bcrypt.hash(password, 10);
    user.password = hashedNewPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpiresAt = undefined;

    await user.save();

    await sendResetSucessEmail(user.email);

    res
      .status(200)
      .json({ sucess: true, message: "Reset password sucessfull" });
  } catch (error) {
    console.log("Error while reseting password", error.message);
    res.status(400).json({ sucess: false, message: error.message });
  }
};

export const checkauth = async (req, res) => {
  try {
    const user = await User.findById(req.userID);
    if (!user) {
      return res.status(400).json({ sucess: false, message: "User not found" });
    }

    res.status(400).json({
      sucess: true,
      message: "auth checked sucessfully",
      user: {
        ...user._doc,
        password: undefined,
      },
    });
  } catch (error) {
    console.log("Error while checking auth", error);
    res.status(400).json({ sucess: false, message: error.message });
  }
};
