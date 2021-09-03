import mongoose from "mongoose";

const Schema = mongoose.Schema;
export const RoleSchema = new Schema(
  {
    name: { type: String }
  },
  {
    collection: "Role",
    timestamps: true
  }
);

export const Role = mongoose.model("Role", RoleSchema);
