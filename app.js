const express = require("express");
const createError = require("http-errors");
const mongoose = require("mongoose");
const app = express();

require("dotenv").config();

const port = process.env.PORT;
const path = require("path");
const cors = require("cors");

app.use(cors());
app.use("/public", express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const mainRouter = require("./router/main.route");

app.use("/", mainRouter);

app.use((error, req, res, next) => {
  console.error(error);
  let errorMessage = "An unknown error occurred";
  let statusCode = 500;
  if (createError.isHttpError(error)) {
    statusCode = error.status;
    errorMessage = error.message;
  } else if (error instanceof Error) {
    errorMessage = error.message;
  }
  res.status(statusCode).json({ error: errorMessage });
});

mongoose
  .connect(process.env.MONGO_URI, {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
    //   useCreateIndex: true,
    //   useFindAndModify: false,
  })
  .then(() => {
    console.log("Successfully connected to database.");
    app.listen(port, () => {
      console.log(`App is running on port ${port}`);
    });
  })
  .catch((error) => {
    console.error(error);
  });
