import mongoose from "mongoose";

const Schema = mongoose.Schema;
export const SeedSchema = new Schema(
  {
    key: { type: String }
  },
  {
    collection: "Seed",
    timestamps: true
  }
);

export const Seed = mongoose.model("Seed", SeedSchema);
