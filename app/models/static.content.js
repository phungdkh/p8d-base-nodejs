import mongoose from "mongoose";

const Schema = mongoose.Schema;
export const StaticContentSchema = new Schema(
  {
    title: { type: String },
    slug: { type: String },
    description: { type: String },
    content: { type: String }
  },
  {
    collection: "StaticContent",
    timestamps: true
  }
);

export const StaticContent = mongoose.model("StaticContent", StaticContentSchema);
