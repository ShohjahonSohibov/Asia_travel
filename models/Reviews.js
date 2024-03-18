const mongoose = require("mongoose");
let skipEmpty = require("mongoose-skip-empty");
let { format } = require("date-fns");
const { v4 } = require("uuid");

const Reviewschema = new mongoose.Schema(
  {
    id: {
      type: String,
      default: v4,
    },
    text: String,
    saflik_rating: Number,
    location_rating: Number,
    power_rating: Number,
    created_at: {
      type: String,
      set: skipEmpty,
    },
    updated_at: {
      type: String,
      set: skipEmpty,
    },
  },
  {
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
  }
);

Reviewschema.pre("save", function (next) {
  now = new Date();
  now_string = format(now, "dd.MM.yyyy HH:mm");
  this.updated_at = format(now, "dd.MM.yyyy HH:mm");

  if (!this.created_at) {
    this.created_at = format(now, "dd.MM.yyyy HH:mm");
  }

  next();
});

Reviewschema.pre("updateOne", function (next) {
  const now = new Date();
  this.set({ updated_at: format(now, "dd.MM.yyyy HH:mm") });
  next();
});
const reviews = mongoose.model("Reviews", Reviewschema);

module.exports = reviews;
