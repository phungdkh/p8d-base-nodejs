import mongoose from "mongoose";

const Schema = mongoose.Schema;
export const EmailQueueSchema = new Schema(
  {
    from: { type: String },
    from_name: { type: String },
    to: { type: String },
    to_name: { type: String },
    cc: { type: String },
    bcc: { type: String },
    reply_to: { type: String },
    subject: { type: String },
    body: { type: String },
    send_later: { type: Date },
    sent_tries: { type: Number },
    sent_on: { type: Date },
    message: { type: String },
    attachments: { type: Array },
    
    customer: { type: Schema.Types.ObjectId, ref: "Customer" }
  },
  {
    collection: "EmailQueue",
    timestamps: true
  }
);

export const EmailQueue = mongoose.model("EmailQueue", EmailQueueSchema);
