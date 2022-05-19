const { Timestamp } = require("mongodb");
const { mongoose } = require("mongoose");
const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    nickname: {
      type: String,
      default: null,
      unique: true,
    },
    subscrib: [
      {
        _id: false,
        subscribtion: {
          ref: "User",
          type: mongoose.Schema.Types.ObjectId,
        },
      },
    ],
    subscript: [
      {
        _id: false,
        subscription: {
          ref: "User",
          type: mongoose.Schema.Types.ObjectId,
        },
      },
    ],
    blog: {
      ref: "Blog",
      type: mongoose.Schema.Types.ObjectId,
    },
    isActivated: {
      type: Boolean,
      default: false,
    },
    activationLink: String,
    img: {
      type: String,
      default: null,
    },
    profileStatus: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = model("User", userSchema);
