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
  try {
    const confirmAnswerValidator = async (input) => {
      if (!input) {
        return "You need to name the component";
      }
      return true;
    };

    const { apiName } = await inquirer.prompt({
      type: "input",
      message: "component name:",
      name: "apiName",
      validate: confirmAnswerValidator,
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
  } catch (error) {
    console.log(error);
  }
}
