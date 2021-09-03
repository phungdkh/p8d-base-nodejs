import mongoose from "mongoose";

const Schema = mongoose.Schema;
export const ProvinceSchema = new Schema(
  {
    name: { type: String },
    code: { type: String }
  },
  {
    collection: "Province",
    timestamps: true
  }
);

export const Province = mongoose.model("Province", ProvinceSchema);
