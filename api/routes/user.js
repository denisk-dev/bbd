const express = require("express");
const router = express.Router();

const mongoose = require("mongoose");

const User = require("../models/user");
const Progress = require("../models/progress");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const checkingAuth = require("../middleware/checkingauth");

router.post("/getday", (req, res) => {
  User.find({ email: req.body.body })
    .exec()
    .then((result) => {
      //console.log(result[0]);
      const startedDate = result[0].startedProgram;
      const todayDate = new Date();

      const difference = todayDate.getTime() - startedDate.getTime();
      ///console.log(started);
      const differenceInDays = difference / (1000 * 3600 * 24);
      // console.log(Math.ceil(differenceInDays));
      // console.log(difference);
      res.status(200).json({ day: Math.ceil(differenceInDays) });
    });

  // res.status(200).json({ work: "working" });
});

router.post("/startnew", (req, res) => {
  //console.log(req.body.body);

  // const { email } = JSON.parse(req.body.body);

  User.findOneAndUpdate(
    { email: req.body.body },
    { startedProgram: new Date() },
    { upsert: false },
    (err, doc) => {
      // console.log(doc);
      // console.log(err);
    }
  );
  // .exec()
  // .then((user) => {});

  res.status(200).json({ work: "working" });
});

router.post("/login", (req, res) => {
  const { email, password } = JSON.parse(req.body.body);
  User.find({ email: email })
    .exec()
    .then((user) => {
      // console.log(user);
      if (user.length < 1) {
        return res.status(401).json({
          message: "Auth failed",
          errorMessage: "User with this email doesn't exist",
        });
      }

      //   console.log(user);
      // console.log(password);
      // console.log(user[0].password);
      let authPassword = bcrypt.compareSync(password, user[0].password);

      if (!authPassword) {
        return res.status(401).json({
          message: "Auth failed",
          errorMessage: "Incorrect password",
        });
      }

      bcrypt.compare(password, user[0].password, (err, result) => {
        // if (err) {
        //   console.log(err, "line 31");

        // }
        if (result) {
          const token = jwt.sign(
            {
              email: user[0].email,
              userId: user[0]._id,
            },
            //fix this
            "secretkey",
            { expiresIn: "1h" }
          );
          return res
            .status(200)
            .json({ message: "Auth successful", token: token });
        }
      });
    });
});

router.get("/checkingtoken", checkingAuth, function (req, res) {
  res.sendStatus(200);
});

router.post("/signup", (req, res) => {
  const { email, password, name } = JSON.parse(req.body.body);
  // console.log(req.body);
  User.find({ email: email })
    .exec()
    .then((user) => {
      //   console.log(user);
      if (user.length >= 1) {
        return res.status(409).json({ message: "User already exist" });
      } else {
        bcrypt.hash(password, 10, (err, hash) => {
          if (err) {
            return res.status(500).json({
              error: err,
            });
          } else {
            const user = new User({
              email: email,
              password: hash,
              name: name,
            });

            user
              .save()
              .then((result) => {
                // console.log(result);
                res.status(201).json({
                  message: "User created",
                });

                for (let i = 0; i < 10; i++) {
                  let progress = new Progress({
                    email: email,
                    day: i + 1,
                    cardio: false,
                    exercises: false,
                    feeder: [],
                    meals: [],
                    vacuums: [],
                  });

                  progress
                    .save()
                    .then((result) => {
                      // console.log(result);
                      // console.log(trackingArray);
                    })
                    .catch((err) => console.log(err));
                }
              })
              .catch((err) => {
                res.status(500).json({
                  error: err,
                });
              });
          }
        });
      }
    });
});

module.exports = router;
