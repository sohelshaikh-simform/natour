const { default: mongoose } = require("mongoose");  
const tourSchema = new mongoose.Schema({
    name: {
      type: String,
      required: [true, "Atour must have name"],
      unique: true,
      trim:true
    },
    durations:{
      type:Number,
      required:[true,'A Tour must have duration']
    },
    maxGroupSize:{
      type:Number,
      required:[true,'A Tour must have group size']
    },
    difficulty:{
      type:Number,
      required:[true,'A Tour must have difficulty']
    },
    ratingAverage: {
      type: Number,
      default: 4.5,
    },
    ratingQuantity: {
      type: Number,
      default: 0,
    },
    price: {
      type: Number,
      required: [true, "A Tour must have price"], 
    },
    priceDiscount:Number,
    summary:{
      type:String,
      trim:true
    },
    description:{
      type:String,
      trim:true
    },
    imageCover:{
      type:String,
      required:[true,"A Tour must have  a cover Page"]
    },
    images:[String]
  });
  
  const Tour = mongoose.model("Tour", tourSchema);
  module.exports=Tour