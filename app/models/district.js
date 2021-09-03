import mongoose from "mongoose";

const Schema = mongoose.Schema;
export const DistrictSchema = new Schema(
  {
    name: { type: String },
    code: { type: String },
    province: { type: Schema.Types.ObjectId, ref: "Province" }
  },
  {
    collection: "District",
    timestamps: true
  }
);

export const District = mongoose.model("District", DistrictSchema);
