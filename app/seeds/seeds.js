import { Seed } from "../models/seed";
import { Province } from "../models/province";
import { District } from "../models/district";
import { Ward } from "../models/ward";
import { Role } from "../models/role";
import { User } from "../models/user";
var bcryptjs = require("bcryptjs");

const readXlsxFile = require("read-excel-file/node");
const seed = async (key, seedFn) => {
  const seed = await Seed.findOne({ key });
  if (seed) return;
  await seedFn();
  await Seed.create({ key });
};

export const initBaseData = async () => {
  await seed("init-province-data", initProvinceDatas);
  await seed("init-district-data", initDistrictDatas);
  await seed("init-ward-data", initWardDatas);
  await seed("init-role-data", initRoleData);
  await seed("init-super-admin", initSupperAdmin);
};

export const initSupperAdmin = async () => {
  var salt = await bcryptjs.genSaltSync(10);
  var hash = await bcryptjs.hashSync("123456", salt);
  var user = {
    email: "phungdkh@gmail.com",
    passwordHash: hash,
    saltKey: salt
  };
  await User.create(user);
};

export const initProvinceDatas = async () => {
  var provinces = [];

  const rows = await readXlsxFile("data/Province.xlsx");
  for (let index = 1; index < rows.length; index++) {
    let row = rows[index];
    provinces.push({
      name: row[1],
      code: row[0]
    });
  }

  for (let index = 0; index < provinces.length; index++) {
    await Province.create(provinces[index]);
  }
};

export const initDistrictDatas = async () => {
  var districts = [];

  const rows = await readXlsxFile("data/District.xlsx");
  for (let index = 1; index < rows.length; index++) {
    let row = rows[index];
    let provinceCode = row[4];
    let districtName = row[1];
    const province = await Province.findOne({ code: provinceCode });
    if (!province) continue;
    districts.push({
      name: districtName,
      code: row[0],
      province: province._id
    });
  }

  for (let index = 0; index < districts.length; index++) {
    await District.create(districts[index]);
  }
};

export const initWardDatas = async () => {
  var wards = [];
  const rows = await readXlsxFile("data/Ward.xlsx");
  const districts = await District.find();
  for (let index = 1; index < rows.length; index++) {
    let row = rows[index];
    let wardName = row[1];
    let districtCode = row[4];
    const district = districts.find(item => item.code == districtCode);
    if (!district) continue;
    wards.push({
      code: row[0],
      name: wardName,
      district: district._id
    });
  }
  await Ward.create(wards);
};

export const initRoleData = async () => {
  Role.insertMany([{ name: "Admin" }, { name: "Customer" }, { name: "Staff" }]);
};

