const express = require("express");
const path =require('path')
const router = express.Router();
const auth=require('../utils/auth')
const tourController=require('../controller/tourController')

router.route('/top-5-cheap').get(tourController.aliasTopTours,tourController.getAllTours);
router.route('/tour-stats').get(auth,tourController.getTourStats);
router.route('/monthly-plan/:year').get(tourController.getMonthPlan);
router.route("/")
    .get(auth,tourController.getAllTours)
    .post(tourController.createTour);

router.route("/:id")
    .get(tourController.getTour)
    .patch(tourController.updateTour)
    .delete(tourController.deletTour);

module.exports = router;
