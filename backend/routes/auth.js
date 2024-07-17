// routes/auth.js
const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const User = require("../models/User"); // Import the User model
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const authh = require("../middleware/authh");
const isAdmin = require("../middleware/isAdmin");

const OtpModel = require("../models/OtpModel");
const nodemailer = require("nodemailer");
const multer = require("multer");
const Feedback = require("../models/feedbackSchema");

const Book = require("../models/Book");

const { ObjectId } = require("mongodb");

module.exports = router;
const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: "rizwannaik790026@gmail.com", // Your email
    pass: "gjdz rqhj ibbf keuc", // Your password
  },
});

// Function to generate a random reset token (placeholder, you may implement your own logic)
const generateResetToken = () => {
  const tokenLength = 20; // Length of the reset token
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let token = "";
  for (let i = 0; i < tokenLength; i++) {
    token += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return token;
};
router.delete("/issues/:email/:issueId", async (req, res) => {
  try {
    const user = await User.findOneAndUpdate(
      { email: req.params.email },
      { $pull: { bookIssues: { _id: req.params.issueId } } },
      { new: true }
    );
    if (!user) {
      return res.status(404).send("User not found");
    }
    res.status(200).send(user.bookIssues);
  } catch (error) {
    res.status(500).send("Internal server error");
  }
});

router.post("/issue", async (req, res) => {
  try {
    const { fullName, email, contactNumber, issueDate, dueDate } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).send("User not found");
    }

    const bookIssue = {
      fullName,
      contactNumber,
      issueDate,
      dueDate,
    };

    if (!user.bookIssues) {
      user.bookIssues = [];
    }
    user.bookIssues.push(bookIssue);

    await user.save();
    res.status(201).send("Book issued successfully");
  } catch (error) {
    res.status(500).send("Internal server error");
  }
});

router.get("/issues/:email", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.params.email });
    if (!user) {
      return res.status(404).send("User not found");
    }

    res.status(200).send(user.bookIssues);
  } catch (error) {
    res.status(500).send("Internal server error");
  }
});

router.post("/add", async (req, res) => {
  const newBook = new Book(req.body);
  try {
    const savedBook = await newBook.save();
    res.status(201).json(savedBook);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all books
router.get("/book", async (req, res) => {
  try {
    const books = await Book.find();
    res.status(200).json(books);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete a book
router.delete("/book/:id", async (req, res) => {
  console.log("hii");
  console.log(req.params.id);
  const _id = req.params.id;
  try {
    await Book.deleteOne({ _id });
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
router.post("/generate-otp", async (req, res) => {
  try {
    const { email } = req.body;

    // Check if an unexpired OTP exists for the given email
    const existingOTP = await OtpModel.findOne({
      email,
      expiresAt: { $gt: new Date() },
    });

    if (existingOTP) {
      const { otp } = existingOTP;

      // Resend the OTP through email
      const mailOptions = {
        from: "rizwannaik790026@gmail.com", // Your email
        to: email,
        subject: "Resent OTP Verification",
        text: `Your OTP is: ${otp}`,
      };

      transporter.sendMail(mailOptions, async (error) => {
        if (error) {
          console.error("Error sending email:", error);
          return res.status(500).json({ error: "Failed to resend OTP" });
        }

        res.status(200).json({ message: "OTP resent successfully" });
      });
    } else {
      // Generate a new OTP and expiry time
      await OtpModel.deleteMany({ email, expiresAt: { $lte: new Date() } });

      const otp = Math.floor(1000 + Math.random() * 9000);
      const expirationTime = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes from now

      const mailOptions = {
        from: "rizwannaik790026@gmail.com", // Your email
        to: email,
        subject: "OTP Verification",
        text: `Your OTP is: ${otp}`,
      };

      transporter.sendMail(mailOptions, async (error) => {
        if (error) {
          console.error("Error sending email:", error);
          return res.status(500).json({ error: "Failed to send OTP" });
        }

        const newOtpEntry = new OtpModel({
          email,
          otp,
          expiresAt: expirationTime,
        });
        await newOtpEntry.save();

        res.status(200).json({ message: "OTP sent successfully" });
      });
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Failed to send OTP" });
  }
});

// router.post("/forget", async (req, res) => {
//   try {
//     const { email, otp } = req.body;
//     const user = await User.findOne({ email });

//     if (!user) {
//       return res.status(400).json({ error: "User not found" });
//     }
//     const userOTP = await OtpModel.findOne({ email });

//     if (!userOTP) {
//       return res.status(404).json({ error: "OTP not found" });
//     }

//     if (userOTP.otp !== parseInt(otp)) {
//       return res.status(401).json({ error: "Invalid OTP" });
//     }

//     if (userOTP.expiresAt < new Date()) {
//       return res.status(401).json({ error: "OTP expired" });
//     }

//     const tempPassword = user.password; // Store hashed password temporarily
//     console.log(tempPassword);
//     // Here, you decrypt the hashed password to plaintext
//     const decryptedPassword = await bcrypt.compare(tempPassword, tempPassword);
//     console.log(decryptedPassword);
//     const mailOptions = {
//       from: "rizwannaik790026@gmail.com",
//       to: email,
//       subject: "Forget password",
//       text: `Your Password is: ${decryptedPassword}`,
//     };

//     transporter.sendMail(mailOptions, async (error) => {
//       if (error) {
//         console.error("Error sending email:", error);
//         return res.status(500).json({ error: "Failed to send OTP" });
//       }

//       await OtpModel.deleteOne({ email });

//       res.status(200).json({
//         message: "User password sent successfully",
//       });
//     });
//   } catch (error) {
//     console.log("Error:", error);
//     res.status(500).json({ error: "Password recovery failed" });
//   }
// });
router.post("/forget", async (req, res) => {
  const { email, otp } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    const userOTP = await OtpModel.findOne({ email });

    if (!userOTP) {
      return res.status(404).json({ error: "OTP not found" });
    }

    if (userOTP.otp !== parseInt(otp)) {
      return res.status(401).json({ error: "Invalid OTP" });
    }

    if (userOTP.expiresAt < new Date()) {
      await OtpModel.deleteOne({ email });
      return res.status(401).json({ error: "OTP expired" });
    }
    await OtpModel.deleteOne({ email });
    const resetToken = generateResetToken(); // Implement your reset token generation logic

    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = Date.now() + 3600000; // Token expiration time (1 hour)

    await user.save();

    const resetLink = `http://localhost:3000/reset-password/${resetToken}`;

    const mailOptions = {
      from: "rizwannaik790026@gmail.com",
      to: email,
      subject: "Reset Password",
      text: `Use this link to reset your password: ${resetLink}`,
    };

    transporter.sendMail(mailOptions, async (error) => {
      if (error) {
        console.error("Error sending email:", error);
        return res.status(500).json({ error: "Failed to send reset link" });
      }

      res.status(200).json({ message: "Reset link sent successfully" });
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Password recovery failed" });
  }
});
router.post("/reset-password/:resetToken", async (req, res) => {
  const { resetToken } = req.params;
  const { newPassword } = req.body;
  console.log(req.body);
  try {
    const user = await User.findOne({
      resetPasswordToken: resetToken,
      resetPasswordExpires: { $gt: Date.now() },
    });
    console.log(user);
    if (!user) {
      return res.status(400).json({ error: "Invalid or expired token" });
    }

    // const hashedPassword = await bcrypt.hash(newPassword, 12);
    // user.password = hashedPassword;
    user.password = newPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    await user.save();

    res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Failed to reset password" });
  }
});

router.post("/reg", async (req, res) => {
  console.log("registration is calling");
  try {
    const { full_name, email, password, otp } = req.body;

    if (!full_name || !email || !password || !otp) {
      return res.status(422).json({ error: "Please fill all fields" });
    }

    const userExit = await User.findOne({ email: email });
    if (userExit) {
      return res.status(422).json({ error: "Email already exists" });
    }

    // Fetch OTP from the database based on the provided email
    const userOTP = await OtpModel.findOne({ email });

    if (!userOTP) {
      return res.status(404).json({ error: "OTP not found" });
    }

    // Check if the provided OTP matches the stored OTP
    if (userOTP.otp !== parseInt(otp)) {
      return res.status(401).json({ error: "Invalid OTP" });
    }

    // Check if the OTP is expired
    if (userOTP.expiresAt < new Date()) {
      await OtpModel.deleteOne({ email });
      return res.status(401).json({ error: "OTP expired" });
    }

    // OTP is valid, proceed with user registration
    const newUser = new User({ full_name, email, password });
    await newUser.save();

    // Once OTP is used for validation, delete it from the database
    await OtpModel.deleteOne({ email });

    res.status(201).json({ message: "Registration successful" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Registration failed" });
  }
});
router.post("/changepassword", async (req, res) => {
  try {
    const { email, password, newpassword } = req.body;
    const userlogin = await User.findOne({ email: email });

    if (!userlogin) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, userlogin.password);

    if (!isMatch) {
      return res.status(400).json({ error: "Invalid old password" });
    }

    // Update the password
    userlogin.password = newpassword;
    await userlogin.save();

    res.status(200).json({
      message: "User password changed successfully",
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Failed to change password" });
  }
});

router.post("/log", async (req, res) => {
  console.log(req.body);
  try {
    let token;
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "plz filled the field" });
    }
    const userlogin = await User.findOne({ email: email });
    console.log(userlogin);
    if (userlogin) {
      const ismatch = await bcrypt.compare(password, userlogin.password);
      token = await userlogin.generateAuthToken();

      // res.cookie("jwtoken", token, {
      //   expires: new Date(Date.now() + 25892000000),
      //   httpOnly: true,
      // });
      res.cookie("jwtoken", token, {
        expires: new Date(Date.now() + 25892000000),
        httpOnly: true,
        secure: true,
        sameSite: "none",
        // Ensure to set the secure flag
      });

      if (!ismatch) {
        res.status(400).json({ message: "invalid carendatinals " });
      } else {
        res.status(200).json({
          message: "user login succesfully",
          userlogin: userlogin,
        });
      }
    } else {
      res.status(400).json({ message: "invalid carendatinals " });
    }
  } catch (error) {
    console.log("Error:", error);
    res.status(500).json({ error: "login failed" });
  }
});
router.get("/riz", authh, (req, res) => {
  res.send(req.rootUser);
});
// router.get('/rifat',authh ,(req ,res) => {
//   console.log("nav calling");

//   })
router.get("/rifat", authh, (req, res) => {
  res.json({ userDataa: true });
});
// router.get("/about", authh, (req, res) => {
//   console.log("about");
//   res.send(req.rootUser);
// });
router.get("/about", authh, (req, res) => {
  if (req.rootUser) {
    // Assuming req.rootUser is an object
    res.json(req.rootUser);
  } else {
    res.status(401).json({ error: "Unauthorized" }); // Sending a JSON object for unauthorized cases
  }
});

router.get("/logout", authh, (req, res) => {
  res.clearCookie("jwtoken", {
    path: "/",
    secure: true,
    sameSite: "none",
  });
  res.status(200).send("user logout");
});

router.get("/notification", async (req, res) => {
  try {
    const notification = await alert.find();
    res.json(notification);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
router.delete("/notification/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await alert.findByIdAndDelete(id);
    res.status(200).json({ message: "Notification deleted successfully" });
  } catch (error) {
    console.error("Error deleting notification:", error);
    res.status(500).send("An error occurred while deleting the notification.");
  }
});
router.put("/grant-admin", async (req, res) => {
  try {
    const { userEmail, userPassword, targetUserEmail } = req.body;
    console.log("admin_grant is calling");
    // Authenticate the user making the request
    const currentUser = await User.findOne({ email: userEmail });
    if (
      !currentUser ||
      !bcrypt.compareSync(userPassword, currentUser.password)
    ) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    if (currentUser.role !== "admin") {
      return res.status(401).json({ error: "Unauthorized access" });
    }

    // Find the user by email and update their role to 'admin'
    const targetUser = await User.findOneAndUpdate(
      { email: targetUserEmail },
      { role: "admin" }
    );

    if (!targetUser) {
      return res.status(404).json({ error: "User not found" });
    }

    // Respond with success message or updated user details
    res.status(200).json({
      message: "Admin privileges granted successfully",
      user: targetUser,
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Failed to grant admin privileges" });
  }
});

// router.get("/create-initial-admin", async (req, res) => {
//   try {
//     // Check if this route is accessed in a controlled environment (e.g., local development)
//     // Implement additional security checks if needed

//     // Check if no user exists with admin role
//     const existingAdmin = await User.findOne({ role: "admin" });
//     if (existingAdmin) {
//       return res.status(400).json({ error: "Admin user already exists" });
//     }

//     // Fetch email and password from environment variables
//     const initialAdminEmail = process.env.EMAIL;
//     const initialAdminPassword = process.env.PASSWORD;

//     // Create a new user with admin privileges using fetched credentials
//     const newAdmin = new User({
//       email: initialAdminEmail,
//       password: initialAdminPassword, // Ensure to hash the password before saving in the actual application
//       role: "admin",
//     });

//     await newAdmin.save();

//     res.status(201).json({ message: "Initial admin created successfully" });
//   } catch (error) {
//     console.error("Error:", error);
//     res.status(500).json({ error: "Failed to create initial admin" });
//   }
// });
router.put("/remove-admin", async (req, res) => {
  try {
    const { userEmail, userPassword, targetUserEmail } = req.body;
    const initialAdminEmail = process.env.EMAIL;
    const initialPassword = process.env.PASSWORD;
    if (userEmail === initialAdminEmail && userPassword === initialPassword) {
      const targetUser = await User.findOneAndUpdate(
        { email: targetUserEmail },
        { role: "user" }
      );

      // Respond with success message or updated user details
      res.status(200).json({
        message: "Admin removed  successfully",
        user: targetUser,
      });
    } else {
      return res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    res
      .status(500)
      .send({ error: "Failed to remove to admin plz try again later" });
  }
});
router.get("/create-initial-admin", async (req, res) => {
  try {
    // Check if this route is accessed in a controlled environment (e.g., local development)
    // Implement additional security checks if needed

    // Fetch email from environment variables
    const initialAdminEmail = process.env.EMAIL;

    // Find user by email
    const existingUser = await User.findOne({ email: initialAdminEmail });

    if (!existingUser) {
      return res.status(401).json({ error: "Unauthorized access" });
    }

    // If user with the specified email exists, update their role to 'admin'
    if (existingUser.role !== "admin") {
      existingUser.role = "admin";
      await existingUser.save();
      return res
        .status(200)
        .json({ message: "User role updated to admin successfully" });
    }

    // If the user is already an admin, send an error indicating that admin user already exists
    return res.status(400).json({ error: "Admin user already exists" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Failed to create initial admin" });
  }
});

router.get("/adminUsers", async (req, res) => {
  try {
    const adminUsers = await User.find({ role: "admin" }).select(
      "full_name email profileImage"
    );

    if (!adminUsers || adminUsers.length === 0) {
      return res.status(404).json({ message: "No admin users found" });
    }

    res.json(adminUsers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/admin-route", isAdmin, (req, res) => {
  // This route handler will only execute if the user has a valid token and is an admin
  res.status(200).json({ message: "Admin route accessed successfully" });
});
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post("/upload-image", upload.single("image"), async (req, res) => {
  try {
    const { email } = req.body; // Assuming email is sent from the frontend

    // Find the user based on the provided email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).send("User not found.");
    }

    if (!req.file) {
      return res.status(400).send("No file uploaded.");
    }

    // Save the uploaded image data to the user's profileImage field
    user.profileImage = `data:${
      req.file.mimetype
    };base64,${req.file.buffer.toString("base64")}`;

    // Save the updated user document to the database
    await user.save();
    res.status(200).json({
      message: "user profile update  succesfully",
      user: user,
    });
    // res
    //   .status(200)
    //   .send("Image uploaded and user profile updated successfully.");
  } catch (error) {
    console.error("Error uploading image:", error);
    res.status(500).send("Failed to upload image and update user profile.");
  }
});

module.exports = router;
