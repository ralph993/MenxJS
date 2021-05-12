import { appendFile } from "fs";
import { routerTemplate } from "./router.template";

export function generateRouter(apiDir, apiName) {
  appendFile(
    `${apiDir}/${apiName}/${apiName}.router.js`,
    routerTemplate(apiName),
    (err) => {
      if (err) throw err;
    }
  );
}
