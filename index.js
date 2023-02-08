require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const libraryRoutes = require("./routes/LibraryRoutes");

const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUiExpress = require("swagger-ui-express");

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

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Vocally Library API docs",
      version: "1.0.0",
      description:
        "This is a simple Library management API made with Node JS and Express JS",
      contact: {
        name: "Yuvraj Singh",
        email: "yuvi7860808034@gmail.com",
      },
    },
    servers: [
      {
        url: `http://localhost:3000`,
      },
    ],
  },
  apis: ["./routes/*.js"],
};

const spacs = swaggerJsdoc(options);
app.use("/api-docs", swaggerUiExpress.serve, swaggerUiExpress.setup(spacs));

const server = app.listen(process.env.PORT, () => {
  console.log(`Server running at http://localhost:${process.env.PORT}`);
});
