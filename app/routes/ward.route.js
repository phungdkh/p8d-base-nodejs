import { catchAsyncErrors } from "../errors/catch-async-error";
import WardController from "../controllers/ward.controller";

export const wardRouter = router => {
  router
    .route("/wards/by-district/:districtId")
    .get(catchAsyncErrors(WardController.getWardsByDistrict));
};
