import { appendFile } from "fs";
import { schemaTemplate } from "./schema.template";

export function generateSchema(apiDir, apiName) {
  appendFile(
    `${apiDir}/${apiName}/${apiName}.schema.js`,
    schemaTemplate(),
    (err) => {
      if (err) throw err;
    }
  );
}
