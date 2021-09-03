import { User } from "../models/user";
import { appError } from "../errors/app.error";
import _ from "lodash";
var jwt = require("jsonwebtoken");
var bcryptjs = require("bcryptjs");

export default class UserController {
  static getUsers = async (req, res, next) => {
    const users = await User.find({});
    res.json(users);
  };

  static edit = async (req, res, next) => {
    const { id } = req.params;
    const {
      email,
      name,
      mobile,
      dateOfBirth,
      gender,
      about,
      avatarUrl,
      address,
      facebookId,
      googleId,
      twitterId,
      linkedInId
    } = req.body;
    try {
      let user = await User.findById(id, {});
      if (!user) {
        throw appError("The user is not found", 404);
      } else {
        await user.update({
          email: email || user.email,
          name: name || user.name,
          mobile: mobile || user.mobile,
          dateOfBirth: dateOfBirth || user.dateOfBirth,
          gender: gender || user.gender,
          about: about || user.about,
          avatarUrl: avatarUrl || user.avatarUrl,
          address: address || user.address,
          facebookId: facebookId || user.facebookId,
          googleId: googleId || user.googleId,
          twitterId: twitterId || user.twitterId,
          linkedInId: linkedInId || user.linkedInId
        });
        user = await User.findById(id, {});
        res.json(user);
      }
    } catch (err) {
      throw appError(err, 500);
    }
  };

  static delete = async (req, res, next) => {
    const { id } = req.params;
    try {
      const user = await User.findById(id, {});
      if (!user) {
        throw appError("The user is not found", 404);
      } else {
        await user.remove();
        res.json(true);
      }
    } catch (err) {
      throw appError(err, 500);
    }
  };

  static getProfile = async (req, res, next) => {
    const user = await User.findById(req.user._id);
    return res.json(user);
  };

  static changePassword = async (req, res, next) => {
    let user = await User.findOne({ _id: req.user._id });
    const { password, newPassword } = req.body;
    const passwordIsValid = bcryptjs.compareSync(password, user.passwordHash);
    if (!passwordIsValid)
      throw appError("Current password is not correct!", 400);
    const salt = await bcryptjs.genSaltSync(10);
    const hash = await bcryptjs.hashSync(newPassword, salt);
    user = await user.update({
      passwordHash: hash,
      saltKey: salt
    });
    return res.json(true);
  };

  static register = async (req, res, next) => {
    const {
      mobile,
      email,
      password,
      name,
      dateOfBirth,
      gender,
      about,
      address
    } = req.body;
    let user = await User.findOne({ mobile });
    if (user) throw appError("Mobile phone already existed!", 400);
    var salt = await bcryptjs.genSaltSync(10);
    var hash = await bcryptjs.hashSync(password, salt);
    var body = {
      mobile,
      email,
      password,
      name,
      dateOfBirth,
      gender,
      about,
      address,
      passwordHash: hash,
      saltKey: salt
    };
    user = await User.create(body);
    var token = jwt.sign(
      { _id: user._id, mobile: user.mobile, name: user.name },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRES_IN
      }
    );
    res.send({ token: token });
  };

  static getProfile = async (req, res, next) => {
    const user = await user.findById(req.user._id);
    return res.json(user);
  };

  static login = async (req, res, next) => {
    let user = await User.findOne({ email: req.body.email });
    if (!user) throw appError("Email or password is not correct!");
    var passwordIsValid = bcryptjs.compareSync(
      req.body.password,
      user.passwordHash
    );
    if (!passwordIsValid) throw appError("Email or password is not correct!");
    var token = jwt.sign(
      { _id: user._id, email: user.email },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRES_IN
      }
    );
    res.send({ token: token });
  };

  static updateProfile = async (req, res, next) => {
    let user = await user.findById(req.user._id);
    const { email, name } = req.body;
    await user.update({
      email: email || user.email,
      name: name || user.name
    });
    user = await user.findById(req.user._id);
    return res.json(user);
  };
}
