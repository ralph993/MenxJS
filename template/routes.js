import { createWriteStream, readFileSync, writeFileSync } from "fs";
import path from "path";
import ejs from "ejs";
const routesTemplate = path.join(__dirname, "./routes.template.ejs");
const cwd = process.cwd();
const routesDir = `${cwd}/src/routes/routes.json`;

function createFile(routes) {
  const data = {
    routes,
  };
  const options = {};
  ejs.renderFile(routesTemplate, data, options, function (err, str) {
    const outPut = createWriteStream(`${cwd}/src/routes/index.js`);
    outPut.write(str);
    outPut.end();
  });
}

export function generateRoutes(apiDir, apiName) {
  const newRoute = {
    path: `/${apiName}`,
    router: `${apiName}Router`,
    routerPath: `../api/${apiName}/${apiName}.router.js`,
  };

  let routesJson = JSON.parse(readFileSync(routesDir));
  routesJson.push(newRoute);
  writeFileSync(routesDir, JSON.stringify(routesJson));
  createFile(routesJson);
}
