const express = require("express");
const app = express();
const tourRouter = require("./route/tourRouter");
const userRouter=require('./route/userRouter')
const globalErrorHandle = require("./controller/errorController");
const dotenv = require("dotenv");
const AppError = require("./utils/appError");
app.use(express.json());
app.use(express.static("./public"));

app.use("/api/v1/user", userRouter);
app.use("/api/v1/tours", tourRouter);

// Error Handle
app.get("*", (req, res, next) => {
  next(new AppError(`Cant find the ${req.originalUrl} on this server`, 404));
});

app.use(globalErrorHandle);

module.exports=app
