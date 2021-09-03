import { catchAsyncErrors } from "../errors/catch-async-error";
import RoleController from "../controllers/role.controller";

export const roleRouter = router => {
  router.route("/roles").get(catchAsyncErrors(RoleController.get));
  router.route("/roles/by-name").get(catchAsyncErrors(RoleController.getByName));
};
