import { appendFile, readFile } from "fs";
import { routerTemplate } from "./router.template";
import replace from "replace";

export function generateRouter(apiDir, apiName) {
  appendFile(
    `${apiDir}/${apiName}/${apiName}.router.js`,
    routerTemplate(apiName),
    (err) => {
      if (err) throw err;
    }
  );

  const routers = [
    {
      title: "//Router",
      value: `
//Router  
const ${apiName}Router = require("./api/${apiName}/${apiName}.router");`,
    },
    {
      title: "//Routes",
      value: `
//Routes 
app.use("/api/v1/${apiName}", ${apiName}Router);`,
    },
  ];

  for (let i = 0; i < routers.length; i++) {
    const element = routers[i];
    replace({
      regex: element.title,
      replacement: element.value,
      paths: [`${process.cwd()}/src/app.js`],
      recursive: false,
      silent: false,
    });
  }
}
