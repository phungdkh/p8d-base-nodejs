import { Ward } from "../models/ward";

export default class WardController {
  static getWardsByDistrict = async (req, res, next) => {
    try {
      const regex = new RegExp(req.query.query || "", "i");
      const wards = await Ward.find({
        $and: [
          { name: regex },
          { district: req.params.districtId }
        ]
      });
      res.json(wards);
    } catch (err) {
      res.status(500).json(err);
    }
  };
}
