const mongoose = require("mongoose");
var skipEmpty = require("mongoose-skip-empty");
var fns_format = require("date-fns/format");
const { v4 } = require("uuid");

const hotelSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      default: v4,
    },
    room_number: Number,
    type: {
      type: String,
      enum: ["Single", "Double", "Suite"],
    },
    hotel_id: String,
    status: {
      type: String,
      default: "active",
      index: true,
      enum: ["active", "inactive"],
    },
    book_dates: mongoose.Schema.Types.Mixed,
    price: Number,
    images: mongoose.Schema.Types.Mixed,
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

module.exports = mongoose.model("Hotel", hotelSchema);
