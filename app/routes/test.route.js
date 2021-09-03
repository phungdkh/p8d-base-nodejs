import { catchAsyncErrors } from "../errors/catch-async-error";
import EmailController from "../controllers/email.controller";

export const testRouter = router => {
  router.route("/email/send/test").get(catchAsyncErrors(EmailController.testSend));
};
