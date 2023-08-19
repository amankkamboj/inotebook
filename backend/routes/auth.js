const express = require("express");
const User = require("../models/User");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fetchuser = require("../middleware/fetchuser");
const JSON_SECRET = "Aman!Kamboj!1232#";

// Create a User using: POST "/api/auth/createuser". Doesn't require Auth
router.post(
  "/createuser",
  [
    body("name", "Enter a valid name").isLength({ min: 3 }),
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password must be atleast 5 characters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    console.log("request body params");
    console.log(req.body);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    //check user email already exists
    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res.status(400).json({
          error: `Sorry a user with this email - ${req.body.email} already exist!`,
        });
      }
      const secPwd = req.body.password;
      const salt = await bcrypt.genSaltSync(10);
      const hash = await bcrypt.hashSync(secPwd, salt);

      user = await User.create({
        name: req.body.name,
        password: hash,
        email: req.body.email,
      });
      const token = jwt.sign({ user: { id: user.id } }, JSON_SECRET);
      res.json({ token });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Error occured");
    }
  }
);
// 2 User loged in "/api/auth/login". Doesn't require login
router.post(
  "/login",
  [
    body("email", "Enter a valid email").isEmail(),
    body("password", "Enter a valid password").notEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    //check user email already exists
    try {
      let user = await User.findOne({ email: req.body.email });
      if (!user) {
        return res.status(400).json({
          error: `Sorry enter correct credentials.`,
        });
      }
      // compare password from db
      const pwdCompare = await bcrypt.compare(req.body.password, user.password);
      if (!pwdCompare) {
        return res.status(400).json({
          error: `Sorry enter correct credentials.`,
        });
      }

      

      const token = jwt.sign({ user: { id: user.id } }, JSON_SECRET);
      res.json({ token });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal server error");
    }
  }
);

// 3 Get User loged in data "/api/auth/getuser". Require login
router.post(
    "/getuser",fetchuser,    
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      //check user email already exists
      try {
        const userId= req.user.id;
        let user = await User.findById(userId).select("-password");        
        res.json(user);
      } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error");
      }
    }
  );
module.exports = router;
