const express = require("express");
const router = express.Router();
const User = require("../model/Users");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const JWT_SECRET = "ShamimHossain/btc"; 

// Route-1: Creating a user using post: "/api/auth/createuser". Doesn't require authentication.
router.post(
    "/createuser",
    [
      body("username").isLength({ min: 5 }),
      body("email").isEmail(),
      body("password").isLength({ min: 6 }),
    ],
    async (req, res) => {
      let success = false;
      const result = validationResult(req);
      if (!result.isEmpty()) {
        return res.status(400).json({success, errors: result.array() });
      }
  
      try {
        // Checking if the email already exists in the database
        const existingUser = await User.findOne({ email: req.body.email });
        if (existingUser) {
          return res.status(400).json({success, error: "Email already exists" });
        }
  
        // Generating a salt and hash for the user's password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
  
        // Creating a new user
        const newUser = new User({
          username: req.body.username,
          email: req.body.email,
          password: hashedPassword, // Use the hashed password
        });
  
        // Save the new user to the database
        await newUser.save();
  
        // Creating a data object for the JWT payload
        const data = {
          user: {
            id: newUser.id,
          },
        };
  
        // Signing a JWT token
        const authToken = jwt.sign(data, JWT_SECRET);
        success = true;
        res.status(201).json({ success, authToken }); // Send the token as a response
      } catch (error) {
        console.error("Error creating user:", error);
        res.status(500).json({ error: "Error creating user" });
      }
    }
  );

  module.exports = router;