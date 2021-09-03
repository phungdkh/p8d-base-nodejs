import { District } from "../models/district";

export default class DistrictController {
  static getDistrictsByProvince = async (req, res, next) => {
    try {
      const regex = new RegExp(req.query.query || "", "i");
      const districts = await District.find({
        $and: [
          { name: regex },
          { province: req.params.provinceId }
        ]
      }).populate('province');
      res.json(districts);
    } catch (err) {
      res.status(500).json(err);
    }
  };
}
