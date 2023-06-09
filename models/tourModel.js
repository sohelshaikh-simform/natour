const slugify = require("slugify");
const { default: mongoose } = require("mongoose");
const validator=require('validator')

const tourSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Atour must have name"],
      unique: true,
      trim: true,
      maxlength: [40, "A Tour must have less or equal then 40 Characters"],
      minlength: [10, "A Tour must have greaer or equal then 10 Characters"],
      // validate:[validator.isAlpha,'Tour name must only contain Character']
    },
    slug: String,
    duration: {
      type: Number,
      required: [true, "A Tour must have duration"],
    },
    maxGroupSize: {
      type: Number,
      required: [true, "A Tour must have group size"],
    },
    difficulty: {
      type: String,
      required: [true, "A Tour must have difficulty"],
      enum: {
        values: ["easy", "medium", "difficult"],
        message: "Difficulty is either: easy,medium,difficult",
      },
    },
    ratingAverage: {
      type: Number,
      default: 4.5,
      min: [1, "Rating must be above 1.0"],
      max: [5, "Rating must be below 5.0"],
    },
    ratingQuantity: {
      type: Number,
      default: 0,
    },
    price: {
      type: Number,
      required: [true, "A Tour must have price"],
    },
    priceDiscount: {
      type: Number,
      validate: {
        validator: function (val) {
          // this is only point to current doc on New Document creation
          return val < this.price;
        },
        message: "Discount Price ({VALUE}) should be below regular price",
      },
    },
    summary: {
      type: String,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    imageCover: {
      type: String,
      required: [true, "A Tour must have  a cover Page"],
    },
    images: [String],
    createdAt: {
      type: Date,
      default: Date.now(),
      select: false,
    },
    startDates: [Date],
    secretTour: {
      type: Boolean,
      default: false,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// tourSchema.index({price:1,ratingAverage:-1})

tourSchema.virtual("durationWeeks").get(function () {
  return this.duration / 7;
});

// Document only save Create
tourSchema.pre("save", function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

// tourSchema.pre('save',function(next){
//   console.log('will save document');
//   next()
// })

// tourSchema.post('save',function(doc){
//   console.log(doc);
// })

//Query MiddleWare
tourSchema.pre(/^find/, function (next) {
  this.find({ secretTour: { $ne: true } });
  this.start = Date.now();
  next();
});

tourSchema.post(/^find/, function (doc, next) {
  console.log(`query took ${Date.now() - this.start} miliseond`);
  next();
});

// Aggregation Middleware
tourSchema.pre("aggregate", function (next) {
  this.pipeline().unshift({ $match: { secretTour: { $ne: true } } });
  next();
});

const Tour = mongoose.model("Tour", tourSchema);
module.exports = Tour;
