import ejs from "ejs";

export const renderTemplate = async (filename, data) => {
  const html = await ejs.renderFile(`./templates/${filename}`, data);
  return html;
};