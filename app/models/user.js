import mongoose from "mongoose";
import { hashSync } from "bcryptjs";

const Schema = mongoose.Schema;
export const UserSchema = new Schema(
  {
    email: { type: String, unique: true },
    password: { type: String },
    passwordHash: { type: String },
    saltKey: { type: String },
    name: { type: String },
    mobile: { type: String, unique: true },
    dateOfBirth: { type: Date },
    gender: { type: Number },
    about: { type: String },
    avatarUrl: { type: String },
    address: { type: String },
    facebookId: { type: String },
    googleId: { type: String },
    twitterId: { type: String },
    linkedInId: { type: String },
    roles: [{ type: Schema.Types.ObjectId, ref: "Role" }]
  },
  {
    collection: "User",
    timestamps: true
  }
);
UserSchema.pre("save", function(next) {
  if (this.isModified("password")) {
    this.password = this.hashPassword(this.password);
  }
  return next();
});

UserSchema.methods = {
  hashPassword(password) {
    return hashSync(password, 8);
  }
};

export const User = mongoose.model("User", UserSchema);
