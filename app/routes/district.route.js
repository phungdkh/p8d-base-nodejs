import { catchAsyncErrors } from "../errors/catch-async-error";
import DistrictController from "../controllers/district.controller";

export const districtRouter = router => {
  router
    .route("/districts/by-province/:provinceId")
    .get(catchAsyncErrors(DistrictController.getDistrictsByProvince));
};
