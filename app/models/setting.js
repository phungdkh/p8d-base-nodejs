import mongoose from "mongoose";

const Schema = mongoose.Schema;
export const SettingSchema = new Schema(
  {
    key: { type: String },
    value: { type: String },
    type: { type: Number }
  },
  {
    collection: "Setting",
    timestamps: true
  }
);

export const Setting = mongoose.model("Setting", SettingSchema);
