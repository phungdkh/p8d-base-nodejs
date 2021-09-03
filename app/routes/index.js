import { districtRouter } from "./district.route";
import { provinceRouter } from "./province.route";
import { roleRouter } from "./role.route";
import { settingRouter } from "./setting.route";
import { userRouter } from "./user.route";
import { wardRouter } from "./ward.route";
import { testRouter } from "./test.route";

module.exports = router => {
  testRouter(router);
  districtRouter(router);
  provinceRouter(router);
  roleRouter(router);
  settingRouter(router);
  userRouter(router);
  wardRouter(router);
};
