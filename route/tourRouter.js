const express = require("express");
const path =require('path')
const router = express.Router();
const tourController=require('../controller/tourController')
// require('../public/over')
// router.param('id',tourController.checkId);
router.route('/top-5-cheap').get(tourController.aliasTopTours,tourController.getAllTours);
router.route('/tour-stats').get(tourController.getTourStats);
router.route('/monthly-plan/:year').get(tourController.getMonthPlan);
router.route("/")
    .get(tourController.getAllTours)
    .post(tourController.createTour);
    // .post(tourController.checkbody,tourController.createTour);

router.route("/:id")
    .get(tourController.getTour)
    .patch(tourController.updateTour)
    .delete(tourController.deletTour);

module.exports = router;
