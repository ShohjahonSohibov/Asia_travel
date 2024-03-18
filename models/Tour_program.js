const mongoose = require("mongoose");
let skipEmpty = require("mongoose-skip-empty");
let { format } = require("date-fns");
const { v4 } = require("uuid");

const TourProgramSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      default: v4,
    },
    name: {
      type: mongoose.Schema.Types.Mixed,
    },
    status: {
      type: String,
      default: "active",
      index: true,
      enum: ['active', 'inactive'],
  },
    images: mongoose.Schema.Types.Mixed,
    description: mongoose.Schema.Types.Mixed,
    tour_id: {
      type: String,
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

TourProgramSchema.pre("save", function (next) {
  now = new Date();
  now_string = format(now, "dd.MM.yyyy HH:mm");
  this.updated_at = format(now, "dd.MM.yyyy HH:mm");

  if (!this.created_at) {
    this.created_at = format(now, "dd.MM.yyyy HH:mm");
  }

  next();
});

TourProgramSchema.pre("updateOne", function (next) {
  const now = new Date();
  this.set({ updated_at: format(now, "dd.MM.yyyy HH:mm") });
  next();
});

module.exports = mongoose.model("Tour_program", TourProgramSchema);
