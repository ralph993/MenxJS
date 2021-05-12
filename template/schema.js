import { appendFile, mkdirSync } from "fs";
import { schemaTemplate } from "./schema.template";

export function generateSchema(apiDir, apiName) {
  mkdirSync(`${apiDir}/${apiName}/schema`, true);

  appendFile(
    `${apiDir}/${apiName}/schema/${apiName}.schema.js`,
    schemaTemplate(apiName),
    (err) => {
      if (err) throw err;
    }
  );
}
