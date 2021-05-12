import { appendFile } from "fs";
import { middlewareTemplate } from "./middleware.template";

export function generateMiddleware(apiDir, apiName) {
  appendFile(
    `${apiDir}/${apiName}/${apiName}.middleware.js`,
    middlewareTemplate(),
    (err) => {
      if (err) throw err;
    }
  );
}
