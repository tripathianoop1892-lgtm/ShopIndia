import mongoose from "mongoose";

const replySchema = new mongoose.Schema(
  {
    message: {
      type: String,
      required: true,
      trim: true,
    },

    repliedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },

    repliedByName: {
      type: String,
      default: "",
    },

    repliedByRole: {
      type: String,
      default: "admin",
    },
  },
  {
    timestamps: true,
  }
);

const supportSchema = new mongoose.Schema(
  {
    // User who created the ticket
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },

    role: {
      type: String,
      enum: [
        "customer",
        "shopkeeper",
        "distributor",
        "admin",
      ],
      required: true,
    },

    subject: {
      type: String,
      required: true,
      trim: true,
    },

    message: {
      type: String,
      required: true,
      trim: true,
    },

    status: {
      type: String,
      enum: [
        "Pending",
        "In Progress",
        "Resolved",
      ],
      default: "Pending",
    },

    // Latest reply for simple frontend display
    reply: {
      type: String,
      default: "",
    },

    // Full reply history
    replies: {
      type: [replySchema],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

const Support = mongoose.model(
  "Support",
  supportSchema
);

export default Support;