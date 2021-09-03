import EmailHelper from "../helpers/email.helper";
import { TEMPLATES } from "../config";
import { renderTemplate } from "../util";
import { EmailQueue } from "../models/email.queue";
import _ from "lodash";
import { logger } from "../helpers/logger";

export default class EmailService {
  static sendEmail_Registration = async (model) => {
    const toList = [
      {
        to: model.customerName,
      },
    ];
    const html = await renderTemplate(TEMPLATES.REGISTRATION, model);
    try {
      await Promise.all(
        toList.map(({ to }) =>
          EmailQueue.create({
            to: to,
            subject: "Welcome to NodeJS",
            body: html,
            sent_tries: 0,
            send_on: null,
            send_later: null
          })
        )
      );
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  static sendQueue = async (queue) => {
    const { to, subject, body, attachments } = queue;
    try {
      await EmailHelper.send({
        to,
        subject,
        html: body,
        attachments,
      })

      // update mail queue
      queue.sent_on = new Date();
      await queue.save();
      return true;
    } catch (error) {
      logger.error(error);
      queue.sent_tries++;
      await queue.save();
      return false;
    }
  };
}
