const express = require("express");
const User = require("../models/User");
const router = express.Router();
    const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
const fetchuser = require('../middleware/fetchuser');
const { success } = require("concurrently/src/defaults");

const JWT_SECRET = "aaliyareaaliya";

// Route: 1 Creat a user using: POST "/api/auth/creatuser". no login required
router.post(
  "/createuser",
  [
    body("name", "Enter the valid name").isLength({ min: 2 }),
    body("email", "Enter the valid email").isEmail(),
    body("password", "password must be atleast 5 characte").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    let success = false
    // console.log(req.body);
    // const user = User(req.body);
    // user.save()
    // res.send(req.body)

    // if there are errors, return Bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({success, errors: errors.array() });
    }
    // Check whether the user with this email exists already
    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) { 
        return res
          .status(400)
          .json({success, error: "Sorry a user with this email alrady exists" });
      }
      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt);

      // Create a new user
      user = await User.create({
        email: req.body.email,
        name: req.body.name,
        password: secPass,
      });
      const data = {
        user: {
          id: user.id,
        },
      };
      const authtoken = await jwt.sign(data, JWT_SECRET);
      // res.json(user)
      success = true
      res.json({success, authtoken });
    }
    
    
    catch (error) {
      console.error(error.message);
      res.status(500).send("internal server Error");
    }

    //   .then(user => res.json(user))
    //   .catch(err=>{console.log(err)
    // res.json({error: 'Please enter a unique value for email'})})
  }
);

// Route:2 Authenticate a user using: POST "/api/auth/login". no login required

router.post(
  "/login",
  [
    body("email", "Enter the valid email").isEmail(),
    body("password", "password can not be blank").exists(),
  ],
  async (req, res) => {
    let success = false
    // if there are errors, return Bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        success = false
        return res
          .status(400)
          .json({ error: "Please try login with correct credentials" });
      }
      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        success = false
        return res
          .status(400)
          .json({ success, error: "Please try login with correct credentials" });
      }
      const data = {
        user: {
          id: user.id,
        },
      }; 
      const authtoken = jwt.sign(data, JWT_SECRET);
      success = true
      res.json({success, authtoken });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("internal server Error");
    }
  }
);

// Route:3 Get loggedin user Details using: POST "/api/auth/getuser". login required
router.post(
  "/getuser", fetchuser,
  async (req, res) => {
    try {
      userId = req.user.id;
      const user = await User.findById(userId).select("-password");
      res.send(user)
    } catch (error) {
      console.error(error.message);
      res.status(500).send("internal server Error");
    }
  }
);

module.exports = router;
