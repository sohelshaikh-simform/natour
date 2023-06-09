const { fail } = require("assert");
const fs = require("fs");
const Tour = require("../models/tourModel");
const APIFeature = require("./../utils/apiFeatures");

const aliasTopTours = (req, res, next) => {
  req.query.limit = "5";
  req.query.sort = "-ratingAverage,price";
  req.query.fields = "name,price,ratingAverage,summary,difficulty";
  next();
};

// Get All Tour include Sorting,Pagination,LimitFields
const getAllTours = async (req, res) => {
  try {
    const features = new APIFeature(Tour.find(), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();
    const tours = await features.query.explain();

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

// Get a Details about Perticular Tour
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

// Update Tour
const updateTour = async (req, res) => {
  try {
    const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
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

// Create a Tour
const createTour = async (req, res) => {
  try {
    const newTour = await Tour.create(req.body)
    res.status(201).json({
      status: "Success",
      data: {
        tours: newTour,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};

// Delete Tour
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

// get Tour Stats
const getTourStats = async (req, res) => {
  try {
    const stat = await Tour.aggregate([
      {
        $match: {
          ratingAverage: { $gte: 4.5 },
        },
      },
      {
        $group: {
          _id: { $toUpper: "$difficulty" },
          // _id:null,
          numTour: { $sum: 1 },
          numRating: { $sum: "$ratingAverage" },
          avgRating: { $avg: "$ratingAverage" },
          avgPrice: { $avg: "$price" },
          minPrice: { $min: "$price" },
          max: { $max: "$price" },
        },
      },
      {
        $sort: {
          avgPrice: 1,
        },
      }
    ]);
    res.status(200).json({
      status: "Success",
      data: {
        stat,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: "invalid data send",
    });
  }
};

// Searching Tour plan within a year
const getMonthPlan = async (req, res) => {
  try {
    const year = req.params.year * 1;
    const plan = await Tour.aggregate([
      {
        $unwind: "$startDates",
      },
      {
        $match: {
          startDates: {
            $gte: new Date(`${year}-01-01`),
            $lt: new Date(`${year}-12-31`),
          },
        },
      },
      {
        $group: {
          _id: { $month: "$startDates" },
          numTourStarts: { $sum: 1 },
          tours: { $push: "$name" },
        },
      },
      {
        $addFields:{month:'$_id'}
      },  
      {
        $project:{
          _id:0
        }
      },

      {
        $sort:{numTourStarts:-1}
      }

    ]);
    res.status(200).json({
      status: "Success",
      data: {
        totalTour: plan.length,
        plan,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: "invalid data send",
    });
  }
};
module.exports = {
  getAllTours,
  createTour,
  getTour,
  updateTour,
  deletTour,
  aliasTopTours,
  getTourStats,
  getMonthPlan,

};
