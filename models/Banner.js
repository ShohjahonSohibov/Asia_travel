const mongoose = require("mongoose");
let skipEmpty = require("mongoose-skip-empty");
const { format } = require("date-fns");
const { v4 } = require("uuid");

const BannerSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      default: v4,
    },
    name: {
      type: String,
    },
    status: {
      type: String,
      default: "active",
      index: true,
      enum: ["active", "inactive"],
    },
    image: String,
    description: mongoose.Schema.Types.Mixed,
    url_link: {
      type: String,
    },
    start_date: String,
    end_date: String,
    type: {
      type: String
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

BannerSchema.pre("save", function (next) {
  now = new Date();
  now_string = format(now, "dd.MM.yyyy HH:mm");
  this.updated_at = format(now, "dd.MM.yyyy HH:mm");

  if (!this.created_at) {
    this.created_at = format(now, "dd.MM.yyyy HH:mm");
  }

  next();
});

BannerSchema.pre("updateOne", function (next) {
  const now = new Date();
  this.set({ updated_at: format(now, "dd.MM.yyyy HH:mm") });
  next();
});

module.exports = mongoose.model("Banner", BannerSchema);
