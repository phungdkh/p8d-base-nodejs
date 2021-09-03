import nodemailer from "nodemailer";
import sgTransport from "nodemailer-sendgrid-transport"
import { SENDGRID_CONFIG } from "../config";

var options = {
  auth: {
    api_user: SENDGRID_CONFIG.SENDGRID_USERNAME,
    api_key: SENDGRID_CONFIG.SENDGRID_API_KEY
  }
}

const transporter = nodemailer.createTransport(sgTransport(options));

export default class EmailHelper {
  static send = async ({ to, subject, html, attachments }) => {
    const mailOptions = {
      from: SENDGRID_CONFIG.SENDGRID_FROMEMAIL,
      to,
      subject,
      html,
      attachments
    };
    return new Promise((resolve, reject) => {
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          reject(error);
        } else {
          resolve(info);
        }
      })
    });
  };
}
