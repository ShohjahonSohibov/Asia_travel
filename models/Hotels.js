const mongoose = require("mongoose");
let skipEmpty = require("mongoose-skip-empty");
const { format } = require("date-fns");

const { v4 } = require("uuid");

const HotelSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      default: v4,
    },
    name: {
      type: mongoose.Schema.Types.Mixed,
      required: true,
    },
    images: {
      type: mongoose.Schema.Types.Mixed,
    },
    star: {
      type: Number,
      required: true,
    },
    description: {
      type: mongoose.Schema.Types.Mixed,
    },
    location: {
      type: mongoose.Schema.Types.Mixed,
    },
    location_map: {
      type: String,
    },
    politics: {
      type: mongoose.Schema.Types.Mixed,
    },
    status: {
      type: String,
      default: "active",
      index: true,
      enum: ["active", "inactive"],
    },
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

HotelSchema.pre("save", function (next) {
  now = new Date();
  now_string = format(now, "dd.MM.yyyy HH:mm");
  this.updated_at = format(now, "dd.MM.yyyy HH:mm");

  if (!this.created_at) {
    this.created_at = format(now, "dd.MM.yyyy HH:mm");
  }

  next();
});

HotelSchema.pre("updateOne", function (next) {
  const now = new Date();
  this.set({ updated_at: format(now, "dd.MM.yyyy HH:mm") });
  next();
});

module.exports = mongoose.model("Hotel", HotelSchema);
