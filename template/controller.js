import { appendFile } from "fs";
import { controllerTemplate } from "./controller.template";

export function generateController(apiDir, apiName) {
  appendFile(
    `${apiDir}/${apiName}/${apiName}.controller.js`,
    controllerTemplate(apiName),
    (err) => {
      if (err) throw err;
    }
  );
}
