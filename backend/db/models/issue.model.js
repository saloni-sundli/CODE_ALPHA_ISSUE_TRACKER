import mongoose from "mongoose";

const issueSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: String,
    projectTitle: String,
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    comments: [
      {
        commentedBy: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        comment: String,
      },
    ],
    status:String,
    severity:String,
  },
  { timestamps: true }
);

export const Issue = mongoose.model("Issue", issueSchema);
