const express = require("express");
// const { body, validationResult } = require('express-validator');
const router = express.Router();
const fetchuser = require("../middleware/fetchuser");
const Note = require("../models/Note");
const { body, validationResult } = require("express-validator");
const { send } = require("express/lib/response");

// ROUTE 1: Get All the notes using: GET "/api/auth/fetchallnotes". Login required
router.get("/fetchallnotes", fetchuser, async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("internal server Error");
  }
});
// ROUTE 2: POST Add a new Notes using: POST "/api/notes/addnote". Login required
router.post(
  "/addnote",
  fetchuser,
  [
    // body("firstName", "Enter the valid name").isLength({ min: 3 }),
    body('firstName').notEmpty().withMessage('Name is required'),
    // body('lastName').notEmpty().withMessage('Name is required'),
    // body('dob').notEmpty().withMessage('Name is required'),
    // // body('age').isInt({ min: 5, max: 18 }).withMessage('Age must be between 5 and 18'),
    // body('gender').notEmpty().withMessage('Gender is required'),
    // body('fatherName').notEmpty().withMessage('FatherName is required'),
    // body('fatherOcc').notEmpty().withMessage('FatherOcc is required'),
    // body('fatherNum').isMobilePhone().withMessage('Invalid phone number'),
    // body('motherName').notEmpty().withMessage('MotherName is required'),
    // body('motherOcc').notEmpty().withMessage('MotherName is required'),
    // body('motherNum').isMobilePhone().withMessage('Invalid phone number'),
    // body('email').isEmail().withMessage('Invalid email address'),
    // body('activity').notEmpty().withMessage('Activites is required'),
    // body('health').notEmpty().withMessage('Haelth is required'),
    // body('feesMode').notEmpty().withMessage('FeesMode is required'),
    // body('dateOfJuining').notEmpty().withMessage('Date of Juining is required'),

  ],
  async (req, res) => {
    try {
      const { 
        firstName,
        lastName,
        dob,
        gender,
        fatherName,
        fatherOcc,
        fatherNum,
        motherName,
        motherOcc,
        motherNum,
        email,
        activity,
        health,
        feesMode,
        dateOfJuining, 
        agree, 
         } = req.body;
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const note = new Note({
        firstName,
        lastName,
        dob,
        gender,
        fatherName,
        fatherOcc,
        fatherNum,
        motherName,
        motherOcc,
        motherNum,
        email,
        activity,
        health,
        feesMode,
        dateOfJuining,
        agree,
        user: req.user.id,
      });
      const saveNote = await note.save();
      res.json(saveNote);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("internal server Error");
    }

  //   async (req, res) => {
  //     const errors = validationResult(req);
  //     if (!errors.isEmpty()) {
  //         return res.status(400).json({ errors: errors.array() });
  //     }

  //     const { firstName,
  //           lastName,
  //           dob,
  //           gender,
  //           fatherName,
  //           fatherOcc,
  //           fatherNum,
  //           motherName,
  //           motherOcc,
  //           motherNum,
  //           email,
  //           activity,
  //           health,
  //           feesMode,
  //           dateOfJuining, } = req.body;
  //     try {
  //         const note = new Note({ firstName,
  //               lastName,
  //               dob,
  //               gender,
  //               fatherName,
  //               fatherOcc,
  //               fatherNum,
  //               motherName,
  //               motherOcc,
  //               motherNum,
  //               email,
  //               activity,
  //               health,
  //               feesMode,
  //               dateOfJuining, });
  //               const saveNote = await note.save();
  //                 res.json(saveNote);
  //         // await note.save();
  //         res.status(201).json({ message: 'Registration successful' });
  //     } catch (error) {
  //         res.status(400).json({ error: 'Registration failed' });
  //         console.error(error.message);
  //         // res.status(500).send("internal server Error")
  //     }

  //     // res.status(500).send("internal server Error")
  // }
  }
);

// ROUTE 3: Update an existing Notes using: POST "/api/notes/updatenote". Login required
router.put("/updatenote/:id", fetchuser, async (req, res) => {
  try {
    const { 
      firstName,
        lastName,
        dob,
        gender,
        fatherName,
        fatherOcc,
        fatherNum,
        motherName,
        motherOcc,
        motherNum,
        email,
        activity,
        health,
        feesMode,
        dateOfJuining,
        agree
     } = req.body;
    // Create anewNote object
    const newNote = {};
    if (firstName) {
      newNote.firstName = firstName;
    }
    if (lastName) {
      newNote.lastName = lastName;
    }
    if (dob) {
      newNote.dob = dob;
    }
    if (gender) {
      newNote.gender = gender;
    }
    if (fatherName) {
      newNote.fatherName = fatherName;
    }
    if (fatherOcc) {
      newNote.fatherOcc = fatherOcc;
    }
   
    if (fatherNum) {
      newNote.fatherNum = fatherNum;
    }
    if (motherName) {
      newNote.motherName = motherName;
    }
    if (motherOcc) {
      newNote.motherOcc = motherOcc;
    }
    if (motherNum) {
      newNote.motherNum = motherNum;
    }
    if (email) {
      newNote.email = email;
    }
    if (activity) {
      newNote.activity = activity;
    }
    if (health) {
      newNote.health = health;
    }
  
    if (feesMode) {
      newNote.feesMode = feesMode;
    }
    if (dateOfJuining) {
      newNote.dateOfJuining = dateOfJuining;
    }
    if (agree) {
      newNote.agree = agree;
    }

    // Find the note to be updated and update it
    let note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(401).send("Not Found");
    }

    if (note.user.toString() != req.user.id) {
      return res.status(401).send("Not Allowed");
    }

    note = await Note.findByIdAndUpdate(
      req.params.id,
      { $set: newNote },
      { new: true }
    );
    res.json({ note });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("internal server Error");
  }
});

// ROUTE 4: Delete an existing Notes using: DELETE "/api/notes/deletenote". Login required
router.delete("/deletenote/:id", fetchuser, async (req, res) => {
  try {
    const { 
      firstName,
        lastName,
        dob,
        gender,
        fatherName,
        fatherOcc,
        fatherNum,
        motherName,
        motherOcc,
        motherNum,
        email,
        activity,
        health,
        feesMode,
        dateOfJuining,
        agree
     } = req.body;

    // Find the note to be delete and delete it
    let note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).send("Not Found");
    }
    //Allow deletion only if user owns this Note
    if (note.user.toString() != req.user.id) {
      return res.status(401).send("Not Allowed");
    }

    note = await Note.findByIdAndDelete(req.params.id);
    res.json({ Success: "Note has been deleted", note: note });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("internal server Error");
  }
});

// ------------------------Products Search Api-------------------------------
router.get("/search/:key", fetchuser, async (req, res) => {
  let response = await Note.find({
    "$or": [
      { firstName: { $regex: req.params.key } },
      { lastName: { $regex: req.params.key } },
      // {dob: {$regex: req.params.key}},
      { motherNum: { $regex: req.params.key } },
      { fatherNum: { $regex: req.params.key } },
      // {fatherMobile: {$regex: req.params.key}},
      // {motherMobile: {$regex: req.params.key}},
      // {motherName: {$regex: req.params.key}},
      // {motherOcc: {$regex: req.params.key}},
      // {email: {$regex: req.params.key}},
      // {gender: {$regex: req.params.key}},
      // {activities: {$regex: req.params.key}},
      // {classType: {$regex: req.params.key}},
      // {ahp: {$regex: req.params.key}}
    ]
  });

  res.send(response)
})
module.exports = router;
