const express = require("express");

const Program = require("../models/program");

const checkingAuth = require("../middleware/checkingauth");

const router = express.Router();

router.get("/", (req, res) => {
  Program.find({})
    .exec()
    .then((response) => {
      //console.log(response);
      const program = {
        days: response.map((day) => {
          // console.log(day);
          return {
            day: day.day,
            exercises: day.exercises,
            cardio: day.cardio,
            meals: day.meals,
            vacuums: day.vacuums,
            feeder: day.feeder,
          };
        }),
      };
      res.status(200).json(program);
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
});

router.get("/:day", checkingAuth, (req, res) => {
  const day = req.params.day;

  Program.findOne({ day: day })
    .exec()
    .then((response) => {
      // console.log(response);

      if (response) {
        res.status(200).json({
          day: response,
        });
      } else {
        res.status(404).json({ message: "Not a valid entry" });
      }
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
});

router.post("/", checkingAuth, (req, res) => {
  // console.log(req.body);

  const program = new Program({
    day: req.body.day,
    exercises: req.body.exercises,
    cardio: req.body.cardio,
    meals: req.body.meals,
    vacuums: req.body.vacuums,
    feeder: req.body.feeder,
  });
  //google about all this http statuses
  program
    .save()
    .then((result) => {
      res.status(201).json({
        message: "Added the day",
        createdDay: {
          day: result.day,
          exercises: result.exercises,
          cardio: result.cardio,
          meals: result.meals,
          vacuums: result.vacuums,
          feeder: req.body.feeder,
        },
      });
    })
    .catch((err) => {
      //console.log(err);
      res.status(500).json({ error: err });
    });
});

module.exports = router;
