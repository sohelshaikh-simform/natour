const { fail } = require("assert");
const fs = require("fs");
const Tour = require("../models/tourModel");

const getAllTours = async (req, res) => {
  try {
    // Build Query
    // 1A) Filtering
    const queryObj = { ...req.query };
    const excludedField = ["sort", "page", "limit", "fields"];

    excludedField.forEach((el) => {
      delete queryObj[el];
    });

    // 1B) Advance Filtering
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
    let query = Tour.find(JSON.parse(queryStr));

    // 2) Sort
    if (req.query.sort) {
      const sortBy = req.query.sort.split(",").join(" ");
      query = query.sort(sortBy);
    } else {
      query = query.sort("-createdAt");
    }

    // 3) Field Limiting
    if (req.query.fields) {
      console.log(req.query.fields);
      const fields = req.query.fields.split(",").join(" ");
      query = query.select(fields);
    } else {
      query = query.select("-__v");
    }
    
    // Execute Query
    const tours = await query;

    res.status(200).json({
      status: "Success",
      results: tours.length,
      data: {
        tours,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};

const getTour = async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id);
    res.status(200).json({
      status: "Success",
      data: {
        tour,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};

const updateTour = async (req, res) => {
  try {
    const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    console.log(tour);
    res.status(201).json({
      status: "Success",
      data: {
        tour,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};

const createTour = async (req, res) => {
  try {
    const newTour = await Tour.create(req.body);
    res.status(201).json({
      status: "Success",
      data: {
        tours: newTour,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: "invalid data send",
    });
  }
};

const deletTour = async (req, res) => {
  try {
    const tour = await Tour.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: "Success",
      data: null,
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: "invalid data send",
    });
  }
};

// const tours = JSON.parse(fs.readFileSync(`${__dirname}/../tour-simple.json`));

// const checkId = (req, res, next, val) => {
//   const id = req.params.id * 1;
//   const tour = tours.find((el) => el.id === id);
//   if (!tour) {
//     return res.status(404).json({
//       status: "Fail",
//       message: "Invalid Id",
//     });
//   }
//   next();
// };

// const checkbody = (req, res, next) => {
//   if (!req.body.name || !req.body.price) {
//     return res.status(404).json({
//       status: "Fail",
//       message: "Misssing name or price",
//     });
//   }
//   next();
// };

// const getAllTours = (req, res) => {
//   res.status(200).json({
//     status: "Success",
//     results: tours.length,
//     data: {
//       tours,
//     },
//   });
// };

// const getTour = (req, res) => {
//   const id = req.params.id * 1;
//   const tour = tours.find((el) => el.id === id);
//   res.status(200).json({
//     status: "Success",
//     data: {
//       tour,
//     },
//   });
// };

// const updateTour = (req, res) => {
//   const id = req.params.id * 1;

//   const index = tours.findIndex((value) => {
//     return value.id == id;
//   });

//   for (b in req.body) {
//     tours[index][b] = req.body[b];
//   }

//   fs.writeFile(
//     `${__dirname}/../tour-simple.json`,
//     JSON.stringify(tours),
//     (err) => {
//       res.status(201).json({
//         status: "Success",
//         data: {
//           tours: tours,
//         },
//       });
//     }
//   );
// };

// const createTour = (req, res) => {
//   const newId = tours[tours.length - 1].id + 1;
//   const newTour = Object.assign({ id: newId }, req.body);
//   tours.push(newTour);

//   fs.writeFile(
//     `${__dirname}/../tour-simple.json`,
//     JSON.stringify(tours),
//     (err) => {
//       res.status(201).json({
//         status: "Success",
//         data: {
//           tours: newTour,
//         },
//       });
//     }
//   );
// };

// const deletTour = (req, res) => {
//   const id = req.params.id * 1;
//   const aftrDltTour = tours.filter((value) => {
//     return value.id != id;
//   });
//   const deletedTour = tours.filter((value) => {
//     return value.id == id;
//   });

//   fs.writeFile(
//     `${__dirname}/../tour-simple.json`,
//     JSON.stringify(aftrDltTour),
//     (err) => {
//       res.status(201).json({
//         status: "Success",
//         data: {
//           dtour: deletedTour,
//         },
//       });
//     }
//   );
// };

module.exports = {
  getAllTours,
  createTour,
  getTour,
  updateTour,
  deletTour,
  // checkId,
  // checkbody,
};
