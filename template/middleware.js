import { createWriteStream } from "fs";
import path from "path";
import ejs from "ejs";
const filename = path.join(__dirname, "./middleware.template.ejs");

export function generateMiddleware(apiDir, apiName) {
  const data = {
    apiName,
  };
  const options = {};
  ejs.renderFile(filename, data, options, function (err, code) {
    if (err) {
      console.error(err);
    }
    const outData = createWriteStream(
      `${apiDir}/${apiName}/${apiName}.middleware.js`
    );
    outData.write(code);
    outData.end();
  });
}
