const express = require("express");
const app = express();
const tourRouter = require("./route/tourRouter");
const globalErrorHandle = require("./controller/errorController");
const dotenv = require("dotenv");
const AppError = require("./utils/appError");
app.use(express.json());
app.use(express.static("./public"));


app.use("/api/v1/tours", tourRouter);

app.get("*", (req, res, next) => {
  next(new AppError(`Cant find the ${req.originalUrl} on this server`, 404));
});

app.use(globalErrorHandle);


// const Tour = mongoose.model("Tour", tourSchema);
// const testTour = new Tour({
//   name: "the Parth  Camper",
//   rating: 4.7,
//   price: 497,
// });

// testTour
//   .save()
//   .then((doc) => console.log(doc))
//   .catch((err) => console.log(err));

module.exports=app
