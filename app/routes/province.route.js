import { catchAsyncErrors } from "../errors/catch-async-error";
import ProvinceController from "../controllers/province.controller";

export const provinceRouter = router => {
  router
    .route("/provinces/")
    .get(catchAsyncErrors(ProvinceController.getProvinces));
  router
    .route("/provinces/:id")
    .get(catchAsyncErrors(ProvinceController.getProvince));
  router
    .route("/provinces/")
    .post(catchAsyncErrors(ProvinceController.insert));
  router
    .route("/provinces/:id")
    .put(catchAsyncErrors(ProvinceController.update));
  router
    .route("/provinces/:id")
    .delete(catchAsyncErrors(ProvinceController.delete));
};
