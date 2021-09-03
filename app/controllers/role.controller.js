import { Role } from "../models/role";
import _ from "lodash";

export default class RoleController {
  static get = async (req, res, next) => {
    const roles = await Role.find({});
    res.json(roles);
  };
  
  static getByName = async (req, res, next) => {
    const role = await Role.findOne({ name: req.query.name });
    res.json(role);
  };
}
