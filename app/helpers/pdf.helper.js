import pdf from "html-pdf";
import { renderTemplate } from "../util";

export default class PdfHelper { 
  static generatePdfFromTemplate = async ({
    input,
    output,
    data,
  }) => {
    const options = { format: "A3" };
    const html = await renderTemplate(input, data);
    return new Promise((resolve, reject) => {
      pdf.create(html, options).toFile(`./pdf/${output}`, (err, res) => {
        if (err) {
          reject(err);
        }
        resolve({
          path: res.filename,
          output,
          contentType: "application/pdf"
        });
      });
    });
  };
}