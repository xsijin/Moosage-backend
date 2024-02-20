const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const moosageSchema = new Schema(
  {
    boardId: {
      type: Schema.Types.ObjectId,
      ref: "Board",
      required: true,
    },

    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    message: {
      type: String,
      required: true,
    },

    moodUrl: {
      type: String,
      default:
        "https://cdn.jsdelivr.net/npm/emoji-datasource-apple/img/apple/64/2709-fe0f.png",
    },

    status: {
      type: String,
      enum: ["active", "deleted"],
      default: "active",
    },

    is_public: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Moosage", moosageSchema);
