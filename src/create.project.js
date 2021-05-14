import chalk from "chalk";
import fs from "fs";
import ncp from "ncp";
import Path from "path";
import Listr from "listr";
import { promisify } from "util";
import { projectInstall } from "pkg-install";
import inquirer from "inquirer";

import questions from "../config/questions.json";
import jsonPack from "../config/config-file.json";

const cwd = process.cwd();
const generatorDir = Path.join(__dirname, "../generator");
const copy = promisify(ncp);
const access = promisify(fs.access);

function createPackJson(options) {
  jsonPack.name = options.name;
  jsonPack.author = options.author;
  jsonPack.license = options.license;
  jsonPack.description = options.desc;
  fs.writeFileSync(`${generatorDir}/package.json`, JSON.stringify(jsonPack));
}

async function copyTemplateFiles(from, to) {
  return copy(from, to, {
    clobber: false,
  });
}

export async function createProject() {
  try {
    const answers = await inquirer.prompt(questions);
    await access(generatorDir, fs.constants.R_OK);
    const task = new Listr([
      {
        title: "Create project file",
        task: () => createPackJson(answers),
      },
      {
        title: "Copy project files",
        task: () => copyTemplateFiles(generatorDir, `${cwd}/${answers.name}`),
      },
      {
        title: "Install Dependencies",
        task: () =>
          projectInstall({
            cwd: `${cwd}/${answers.name}`,
          }),
      },
    ]);

    await task.run();
    console.log("%s Project Ready ", chalk.greenBright.bold("✔"));
    console.log(`%s cd ${answers.name} `, chalk.greenBright.bold("✔"));
    console.log("%s npm run dev ", chalk.greenBright.bold("✔"));
    return true;
  } catch (error) {
    console.log(error);
  }
}
