const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    nickName: {
      type: String,
      required: true,
      unique: true,
    },

    preferredName: {
      type: String,
      required: true,
      default: function () {
        return this.nickName;
      },
    },

    email: {
      type: String,
      required: true,
      unique: true,
      match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, // Regular expression for email validation
    },

    password: {
      type: String,
      required: true,
    },

    boards: [
      {
        type: Schema.Types.ObjectId,
        ref: "Board",
      },
    ],

    moosages: [
      {
        type: Schema.Types.ObjectId,
        ref: "Moosage",
      },
    ],

    profilePicUrl: {
      type: String,
    },

    // salt: {
    //   type: String,
    //   required: true,
    // },

    // iterations: {
    //   type: Number,
    //   required: true,
    // },

    token: {
      type: String,
    },

    expire_at: {
      type: Number,
    },

    is_admin: {
      type: Boolean,
      default: false,
    },

    is_banned: {
      type: Boolean,
      default: false,
    },

    status: {
      type: String,
      enum: ["active", "deleted"], // add pending for email verification in future
      default: "active",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
