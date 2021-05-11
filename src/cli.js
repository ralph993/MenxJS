import arg from "arg";
import { createProject } from "./create.project";
import { generateApiComponent } from "./create.api";
import {} from "./create.api";
import chalk from "chalk";

function parseArgIntoOptions(rawArgs) {
  const args = arg(
    {
      "--yes": Boolean,
      "--install": Boolean,
      "--generate": Boolean,
      "--create": Boolean,
      "-y": "--yes",
      "-i": "--install",
      "-g": "--generate",
      "-c": "--create",
    },
    {
      argv: rawArgs.slice(2),
    }
  );
  return {
    skipPrompts: args["--yes"] || false,
    generate: args["--generate"] || false,
    create: args["--create"] || false,
    accion: args._[0],
    runInstall: args["--install"] || false,
  };
}

export function cli(arg) {
  let { generate, create, accion } = parseArgIntoOptions(arg);

  if (create) {
    createProject();
  } else if (generate) {
    generateApiComponent();
  } else {
    console.log("%s No option was given", chalk.red("ERROR:"));
    console.info(chalk.white.bold("Options:"));
    console.info(chalk.white.bold(" -c  -  Create a new project"));
    console.info(chalk.white.bold(" -g  -  Generate a new API component"));
  }
}
