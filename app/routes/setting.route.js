import { catchAsyncErrors } from "../errors/catch-async-error";
import SettingController from "../controllers/setting.controller";

export const settingRouter = router => {
  router
    .route("/settings/")
    .get(catchAsyncErrors(SettingController.getSettings));
  router
    .route("/settings/:key")
    .get(catchAsyncErrors(SettingController.getSettingByKey));
  router
    .route("/settings/save-settings")
    .post(catchAsyncErrors(SettingController.saveSettings));
  router
    .route("/settings/:key")
    .put(catchAsyncErrors(SettingController.update));
  router
    .route("/settings/:key")
    .delete(catchAsyncErrors(SettingController.delete));
};
