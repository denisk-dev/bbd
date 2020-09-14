const express = require("express");

const app = express();

const bodyParser = require("body-parser");

const mongoose = require("mongoose");
const cors = require("cors");

const progressRoutes = require("./api/routes/progress");

const programRoutes = require("./api/routes/program");
const userRoutes = require("./api/routes/user");
app.use(cors());

mongoose.connect(
  "mongodb://localhost:27017/bbd",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => {
    console.log("Connected to mongodb");
  }
);

app.use(bodyParser.json());

app.use("/progress", progressRoutes);
app.use("/program", programRoutes);
app.use(userRoutes);

const port = process.env.PORT || 3500;

app.listen(port, () => {
  console.log("App is running on port " + port);
});
