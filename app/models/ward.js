import mongoose from "mongoose";

const Schema = mongoose.Schema;
export const WardSchema = new Schema(
  {
    name: { type: String },
    code: { type: String },
    district: { type: Schema.Types.ObjectId, ref: "District" }
  },
  {
    collection: "Ward",
    timestamps: true
  }
);

export const Ward = mongoose.model("Ward", WardSchema);
