const User = require("../models/User");
const OTP = require("../models/OTP");
const Profile = require("../models/Profile");
const otpGenerator = require("otp-generator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mailSender = require("../utils/mailSender");
const { passwordUpdated } = require("../mail/templates/passwordUpdate");
require("dotenv").config();

exports.sendOtp = async (req, res) => {
  try {
    const { email } = req.body;

    const checkUserPresent = await User.findOne({ email });

    if (checkUserPresent) {
      return res.status(401).json({
        success: false,
        message: "User already registered",
      });
    }

    var otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });
    console.log("Otp Generated", otp);

    var result = await OTP.findOne({ otp });

    while (result) {
      otp = otpGenerator.generate(6, {
        upperCaseAlphabets: false,
        lowerCaseAlphabets: false,
        specialChars: false,
      });
      result = await OTP.findOne({ otp });
    }

    try {
      // const otpPayload = { email, otp };
      const otpBody = await OTP.create({ email: email, otp: otp });
      console.log(otpBody);
    } catch (error) {
      console.log(error);
      return res.json({
        success: false,
        message: "error while inserting otp inside OTP model",
      });
    }

    return res.status(200).json({
      success: true,
      message: "OTP sent successfully",
      otp,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

exports.signup = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
      accountType,
      contactNumber,
      otp,
    } = req.body;

    if (
      !firstName ||
      !lastName ||
      !email ||
      !password ||
      !confirmPassword ||
      !otp
    ) {
      return res.status(403).json({
        success: false,
        message: "All fields are required",
      });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Password and confirmPassword should match",
      });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists. Please sign in to continue.",
      });
    }

    const recentOtp = await OTP.find({ email })
      .sort({ createdAt: -1 })
      .limit(1);
    console.log(req.body);
    console.log(recentOtp);
    console.log(otp);
    console.log("bye");

    if (recentOtp.length === 0) {
      return res.status(400).json({
        success: false,
        message: "The OTP is not valid",
      });
    } else if (otp !== recentOtp[0].otp) {
      return res.status(400).json({
        success: false,
        message: "Wrong OTP",
      });
    }
    console.log("hi");
    const hashedPassword = await bcrypt.hash(password, 10);

    let approved = "";
    accountType === "Instructor" ? (approved = false) : (approved = true);

    const profileDetails = await Profile.create({
      gender: null,
      dateOfBirth: null,
      about: null,
      contactNumber: null,
    });

    const user = await User.create({
      firstName,
      lastName,
      email,
      contactNumber,
      password: hashedPassword,
      accountType,
      approved,
      additionalDetails: profileDetails._id,
      image: `https://api.dicebear.com/5.x/initials/svg?seed=${firstName}%20${lastName}`,
    });

    return res.status(200).json({
      success: true,
      message: "User registered successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "User is not registered , please try again",
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const user = await User.findOne({ email }).populate("additionalDetails");

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User is not registered,please signup first",
      });
    }

    const checkPassword = await bcrypt.compare(password, user.password);

    if (checkPassword) {
      const payload = {
        email: user.email,
        id: user._id,
        accountType: user.accountType,
      };

      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "24h",
      });

      user.token = token;
      user.password = undefined;

      const options = {
        expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        httpOnly: true,
      };

      res.cookie("token", token, options).status(200).json({
        success: true,
        token,
        user,
        message: "User Login Successful",
      });
    } else {
      return res.status(401).json({
        success: false,
        message: "Password is incorrect",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Login failure, please try again",
    });
  }
};

exports.changePassword = async (req, res) => {
  try {
    const userDetails = await User.findById(req.user.id);

    const { oldPassword, newPassword, confirmNewPassword } = req.body;

    const isPasswordMatch = await bcrypt.compare(
      oldPassword,
      userDetails.password
    );

    if (!isPasswordMatch) {
      return res.status(401).json({
        success: false,
        message: "The password is incorrect",
      });
    }

    if (newPassword !== confirmNewPassword) {
      return res.status(400).json({
        success: false,
        message: "The password & confirm Passwords do not match",
      });
    }

    const encryptedPassword = await bcrypt.hash(newPassword, 10);
    const updatedUserDetails = await User.findByIdAndUpdate(
      req.user.id,
      {
        password: encryptedPassword,
      },
      {
        new: true,
      }
    );

    try {
      const emailResponse = await mailSender(
        updatedUserDetails.email,
        passwordUpdated(
          updatedUserDetails.email,
          `Password Updated successfully for ${updatedUserDetails.firstName} ${updatedUserDetails.lastName}`
        )
      );
      console.log("Email Sent Successfully", emailResponse.response);
    } catch (error) {
      console.log("Error occured while sending email:", error);
      return res.status(500).json({
        success: false,
        message: "Error occured while sending email",
        error: error.message,
      });
    }

    return res.status(200).json({
      success: true,
      message: "Password updated successfully",
    });
  } catch (error) {
    console.error("Error occured while updating password:", error);
    return res.status(500).json({
      success: false,
      message: "Error occured while updating password",
      error: error.message,
    });
  }
};
