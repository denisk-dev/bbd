const express = require("express");

const checkingAuth = require("../middleware/checkingauth");

const Progress = require("../models/progress");

const router = express.Router();

router.get("/:email/:day", (req, res) => {
  const email = req.params.email;
  const day = req.params.day;
  // console.log(email, day);

  Progress.findOne({ email: email, day: day })
    .exec()
    .then((response) => {
      //console.log(response, "line17");
      res.status(200).json({ response });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
});

router.post("/:email/:day", (req, res) => {
  const email = req.params.email;
  const day = req.params.day;

  //console.log(req.body);

  const updatedDayProgress = JSON.parse(req.body.body);
  // console.log(updatedDayProgress, "line 32");

  //imporve thiiiiissss
  Progress.findOneAndUpdate(
    { email, day },
    {
      feeder: updatedDayProgress.feeder,
      meals: updatedDayProgress.meals,
      vacuums: updatedDayProgress.vacuums,
      cardio: updatedDayProgress.cardio,
      exercises: updatedDayProgress.exercises,
    },
    { upsert: true, new: true },
    (error, obj) => {
      if (error) {
        //console.error(JSON.stringify(error));
      }
    }
  ).then((result) => {
    //console.log(result);
    res.status(200).json({ result });
  });
});

// router.get("/", (req, res) => {
//   res.status(200).json({ test: "regulartest" });
// });

module.exports = router;
