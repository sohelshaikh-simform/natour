const express = require("express");
const path =require('path')
const router = express.Router();
const tourController=require('../controller/tourController')
// require('../public/over')
router.param('id',tourController.checkId);
router.route("/")
    .get(tourController.getAllTours)
    .post(tourController.checkbody,tourController.createTour);

router.route("/:id")
    .get(tourController.getTour)
    .patch(tourController.updateTour)
    .delete(tourController.deletTour);

module.exports = router;
