const mongoose = require("mongoose");
var skipEmpty = require("mongoose-skip-empty");
var fns_format = require("date-fns/format");
const { v4 } = require("uuid");

const reviewschema = new mongoose.Schema({
  id: {
    type: String,
    default: v4,
  },
  text: String,
  saflik_rating: Number,
  location_rating: Number,
  power_rating: Number,
  },
  {
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
  }
);

AttributeSchema.pre("save", function (next) {
  now = new Date();
  now_string = fns_format(now, "dd.MM.yyyy HH:mm");
  this.updated_at = fns_format(now, "dd.MM.yyyy HH:mm");

  if (!this.created_at) {
    this.created_at = fns_format(now, "dd.MM.yyyy HH:mm");
  }

  next();
});

AttributeSchema.pre("updateOne", function (next) {
  now = new Date();
  this.update({ updated_at: fns_format(now, "dd.MM.yyyy HH:mm") });

  next();
});
const reviews = mongoose.model("reviews", reviewschema);

module.exports = reviews;
