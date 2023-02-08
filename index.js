require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const libraryRoutes = require("./routes/LibraryRoutes");

const app = express();

app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB Connection Successful");
  })
  .catch((err) => {
    console.log(err.message);
  });

app.use("/library", libraryRoutes);

const server = app.listen(process.env.PORT, () => {
  console.log(`Server running at http://localhost:${process.env.PORT}`);
});
