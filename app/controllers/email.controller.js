import EmailService from "../services/email.service";

export default class EmailController {
  static testSend = async (req, res, next) => {
    await EmailService.testSend();
    res.json(true);
  };
}
