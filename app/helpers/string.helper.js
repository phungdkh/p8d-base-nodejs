import moment from "moment";
import _ from "lodash";

export default class StringHelper {
  static VietnameseSigns = [
    "aAeEoOuUiIdDyY",
    "áàạảãâấầậẩẫăắằặẳẵ",
    "ÁÀẠẢÃÂẤẦẬẨẪĂẮẰẶẲẴ",
    "éèẹẻẽêếềệểễ",
    "ÉÈẸẺẼÊẾỀỆỂỄ",
    "óòọỏõôốồộổỗơớờợởỡ",
    "ÓÒỌỎÕÔỐỒỘỔỖƠỚỜỢỞỠ",
    "úùụủũưứừựửữ",
    "ÚÙỤỦŨƯỨỪỰỬỮ",
    "íìịỉĩ",
    "ÍÌỊỈĨ",
    "đ",
    "Đ",
    "ýỳỵỷỹ",
    "ÝỲỴỶỸ"
  ];

  static removeSign4VietnameseString = () => {
    for (let i = 1; i < VietnameseSigns.Length; i++) {
      for (let j = 0; j < VietnameseSigns[i].Length; j++)
        str = str.replace(VietnameseSigns[i][j], VietnameseSigns[0][i - 1]);
    }
    return str.toLowerCase();
  };

  static getNextAlphabetLetter = current => {
    // let currentChar = char.Parse(current);
    // currentChar = char.toUpperCase(currentChar);
    // let currentIntValue = parseInt(currentChar, 10);
    // let next = currentIntValue + 1;
    // return next;
    return String.fromCharCode(current.charCodeAt(0) + 1);
  };

  static generateOrderCode = input => {
    const myRegex = /([0-9]{6})([A-Z]{1})([0-9]{3})/i;
    const currentDate = moment().format("YYMMDD");
    let output = `${currentDate}A001`;
    const match = input.match(myRegex);
    if (match) {
      const dateStr = match[1];
      const alphabelLetter = match[2];
      let orderNumberStr = match[3];
      let nextLetter = alphabelLetter;
      if (!_.isEmpty(orderNumberStr)) {
        const orderNumberInt = Number.parseInt(orderNumberStr);
        let next = orderNumberInt + 1;
        if (next > 999) {
          next = 1;
          nextLetter = StringHelper.getNextAlphabetLetter(alphabelLetter);
        }
        orderNumberStr =
          next < 10 ? `00${next}` : next < 100 ? `0${next}` : next;
      }
      output = `${dateStr}${nextLetter}${orderNumberStr}`;
    }
    return output;
  };
}