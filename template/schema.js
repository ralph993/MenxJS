import { createWriteStream, mkdirSync } from "fs";
import path from "path";
import ejs from "ejs";
const filename = path.join(__dirname, "./schema.template.ejs");

function capFirstLet(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function generateSchema(apiDir, apiName) {
  mkdirSync(`${apiDir}/${apiName}/schema`, true);

  const data = {
    apiName,
    apiNameCap: capFirstLet(apiName),
  };
  const options = {};
  ejs.renderFile(filename, data, options, function (err, code) {
    if (err) {
      console.error(err);
    }
    const outData = createWriteStream(
      `${apiDir}/${apiName}/schema/${apiName}.schema.js`
    );
    outData.write(code);
    outData.end();
  });
}
