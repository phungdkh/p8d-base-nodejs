import { Province } from "../models/province";

export default class ProvinceController {
  static getProvinces = async (req, res, next) => {
    try {
      const regex = new RegExp(req.query.query || "", "i");
      const provinces = await Province.find({
        name: regex
      });

      res.json(provinces);
    } catch (err) {
      res.status(500).json(err);
    }
  };
}
