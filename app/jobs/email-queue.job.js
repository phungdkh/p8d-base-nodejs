const cron = require("cron");
import { EmailQueue } from "../models/email.queue";
import { logger } from "../helpers/logger";
import EmailService from "../services/email.service";
import _ from "lodash";

// run at midnight
export const initScanEmailQueueJob = new cron.CronJob(
  // run job every 1' once
  "*/180 * * * * *", 
  async () => {
    logger.info("Running job scan email queue from db");
    await scanValidEmailQueue();
  }
);
const scanValidEmailQueue = async () => {
  try {
    const maxTries = 5;
    const queues = await EmailQueue.find({
      $and: [
        { sent_tries: { $lt: maxTries } },
        { sent_on: { $exists: false } },
        {
          $or: [
            { send_later: { $exists: true } },
            { send_later: { $lt: new Date() } }
          ]
        }
      ]
    });
    if (_.isEmpty(queues)) {
      logger.info("Email Queue is empty now.");
      return;
    }
    await Promise.all([
      queues.map(queue => {
        EmailService.sendQueue(queue);
      })
    ]);
    logger.info("Queues are sent successully.");
  } catch (err) {
    logger.error(err);
  }
};
