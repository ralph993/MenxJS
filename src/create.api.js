import inquirer from "inquirer";
import { mkdir, mkdirSync, appendFile } from "fs";
import Listr from "listr";

const cwd = process.cwd();

const apiDir = `${cwd}/src/api`;

function createController(apiName) {
  const template = "module.exports = {};";

  appendFile(
    `${apiDir}/${apiName}/${apiName}.controller.js`,
    template,
    (err) => {
      if (err) throw err;
    }
  );
}

export async function generateApiComponent() {
  const { apiName } = await inquirer.prompt({
    type: "input",
    message: "Component Name",
    name: "apiName",
  });

  const task = new Listr([
    {
      title: "Create component folder",
      task: () => mkdirSync(`${apiDir}/${apiName}`),
    },
    {
      title: "Generate controller",
      task: () => createController(apiName),
    },
  ]);

  await task.run();
}
