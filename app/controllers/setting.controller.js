import { Setting } from "../models/setting";

export default class SettingController {
  static getSettings = async (req, res, next) => {
    try {
      const limit = parseInt(req.query.limit, 10) || 10;
      const offset = parseInt(req.query.offset, 10) || 1;
      const regex = new RegExp(req.query.query || "", "i");
      const settings = await Setting.find({
        $or: [
          { key: regex }
        ]
      }).skip((offset - 1) * limit).limit(limit);

      const count = await Setting.count({
        $or: [
          { key: regex }
        ]
      });

      const totalPages = Math.ceil(count / limit);

      res.json({
        totalCount: count,
        totalPages: totalPages,
        pageSize: limit,
        pageIndex: offset,
        hasPreviousPage: offset > 1,
        hasNextPage: offset < totalPages,
        sources: settings
      });
    } catch (err) {
      res.status(500).json(err);
    }
  };

  static getSettingByKey = async (req, res, next) => {
    try {
      const setting = await Setting.findOne({ key: req.params.key });
      if (!setting) {
        res.status(404).json({
          message: "Setting not found"
        });
      } else {
        res.json(setting);
      }
    } catch (err) {
      res.status(500).json(err);
    }
  };

  static saveSettings = async (req, res, next) => {
    try {
      for (var i = 0; i < req.body.length; i++) {
        let settingModel = req.body[i];
        let setting = await Setting.findOne({ key: settingModel.key });
        if (!setting) {
          await Setting.create(settingModel);
        } else {
          setting.value = settingModel.value;
          setting.valueType = settingModel.valueType;
          await setting.save();
        }
      }
      const settings = await Setting.find({});
      res.json(settings);
    } catch (err) {
      res.status(500).json(err);
    }
  };

  static update = async (req, res, next) => {
    try {
      let setting = await Setting.findOne({ key: req.params.key });
      if (!setting) {
        res.status(404).send({
          message: "Setting not found"
        });
      } else {
        setting.value = req.body.value || setting.value;
        await setting.save();
        setting = await Setting.findById(req.params.id, {});
        res.json(setting);
      }
    } catch (err) {
      res.status(500).json(err);
    }
  };

  static delete = async (req, res, next) => {
    try {
      const setting = await Setting.findOne({ key: req.params.key });
      if (!setting) {
        res.status(404).json({
          message: "Setting not found"
        });
      } else {
        await setting.remove();
        res.status(200).json({
          message: "The setting has been deleted successfully"
        });
      }
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  };
}
