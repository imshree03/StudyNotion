const User = require("../models/User");
const mailSender = require("../utils/mailSender");
const bcrypt = require("bcrypt");

exports.resetPasswordToken = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.json({
        success: false,
        message: "Your Email is not registered with us",
      });
    }

    const token = crypto.randomUUID();

    const updatedDetails = await User.findOneAndUpdate(
      { email },
      {
        token,
        resetPasswordExpires: Date.now() + 5 * 60 * 1000,
      },
      {
        new: true,
      }
    );

    const url = `http://localhost:3000/update-password/${token}`;

    await mailSender(
      email,
      "Password Reset Link",
      `Password Reset Link: ${url}`
    );

    return res.json({
      success: true,
      message: "Email Sent Successfully,please check email and change password",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went Wrong",
    });
  }
};

exports.resetPassword = async (req, res) => {
  try {
    const { password, confirmPassword, token } = req.body;

    if (password !== confirmPassword) {
      return res.json({
        success: false,
        message: "Password not matching",
      });
    }

    const userDetails = await User.findOne({ token });

    if (!userDetails) {
      return res.json({
        success: false,
        message: "Token is invalid",
      });
    }

    if (userDetails.resetPasswordExpires < Date.now()) {
      return res.json({
        success: false,
        message: "Token is expired, plese regenerate your token",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.findOneAndUpdate(
      { token },
      { password: hashedPassword },
      { new: true }
    );

    return res.status(200).json({
      success: true,
      message: "Password Reset Successful",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Password reset not successful",
    });
  }
};
