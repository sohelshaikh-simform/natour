const { default: mongoose } = require("mongoose");  
const tourSchema = new mongoose.Schema({
    name: {
      type: String,
      required: [true, "Atour must have name"],
      unique: true,
    },
    rating: {
      type: Number,
      default: 4.5,
    },
    price: {
      type: Number,
      required: [true, "A Tour must have price"], 
    },
  });
  
  const Tour = mongoose.model("Tour", tourSchema);
  module.exports=Tour