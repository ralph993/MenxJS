import inquirer from "inquirer";
import chalk from "chalk";
import { mkdirSync } from "fs";
import Listr from "listr";
import { generateController } from "../template/controller";
import { generateMiddleware } from "../template/middleware";
import { generateRouter } from "../template/router";
import { generateSchema } from "../template/schema";
const cwd = process.cwd();
const apiDir = `${cwd}/src/api`;

export async function generateApiComponent() {
  const { apiName } = await inquirer.prompt({
    type: "input",
    message: "Component Name",
    name: "apiName",
  });

  const task = new Listr([
    {
      title: "Generate component",
      task: () => mkdirSync(`${apiDir}/${apiName}`),
    },
    {
      title: "Generate controller",
      task: () => generateController(apiDir, apiName),
    },
    {
      title: "Generate middleware",
      task: () => generateMiddleware(apiDir, apiName),
    },
    {
      title: "Generate router",
      task: () => generateRouter(apiDir, apiName),
    },
    {
      title: "Generate schema",
      task: () => generateSchema(apiDir, apiName),
    },
  ]);

  await task.run();

  console.log(
    `%s ${apiName} Successfully generated`,
    chalk.greenBright.bold("DONE")
  );
}
