const mongoose = require("mongoose");
let skipEmpty = require("mongoose-skip-empty");
let { format } = require("date-fns");
const { v4 } = require("uuid");

const RoomSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      default: v4,
    },
    room_number: Number,
    type: {
      type: String,
      enum: ["single", "double", "suite"],
    },
    hotel_id: String,
    status: {
      type: String,
      default: "active",
      index: true,
      enum: ["active", "inactive"],
    },
    book_dates: [String],
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

RoomSchema.pre("save", function (next) {
  now = new Date();
  now_string = format(now, "dd.MM.yyyy HH:mm");
  this.updated_at = format(now, "dd.MM.yyyy HH:mm");

  if (!this.created_at) {
    this.created_at = format(now, "dd.MM.yyyy HH:mm");
  }

  next();
});

RoomSchema.pre("updateOne", function (next) {
  const now = new Date();
  this.set({ updated_at: format(now, "dd.MM.yyyy HH:mm") });
  next();
});

module.exports = mongoose.model("Room", RoomSchema);
