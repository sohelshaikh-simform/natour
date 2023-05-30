const fs = require("fs");
const { default: mongoose } = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

const Tour = require("./../../models/tourModel");

const port = 3000 || process.env.PORT;

mongoose
  .connect("mongodb://localhost:27017/natours", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("success"))
  .catch((err) => console.log(err));

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/tours-simple.json`, "utf-8")
);

//   Import Data From DB
const importData = async () => {
  try {
    await Tour.create(tours);
    console.log("Data Loaded Successfully");
  } catch (err) {
    console.log(err);
  }
  process.exit();
};
//   Delete All Data From DB

const deleteData = async () => {
  try {
    await Tour.deleteMany();
    console.log("Data deleted Successfully");
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

if (process.argv[2] == "--import") {
  importData();
} else if (process.argv[2] == "--delete") {
  deleteData();
}

// console.log(process.argv);
