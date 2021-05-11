import chalk from "chalk";
import fs from "fs";
import ncp from "ncp";
import Path from "path";
import execa from "execa";
import Listr from "listr";
import { promisify } from "util";
import { projectInstall } from "pkg-install";

const cwd = process.cwd();
const templateDir = Path.join(__dirname, "../template");
const copy = promisify(ncp);
const access = promisify(fs.access);

async function copyTemplateFiles(from, to) {
  return copy(from, to, {
    clobber: false,
  });
}

export async function createProject(project) {
  try {
    await access(templateDir, fs.constants.R_OK);
  } catch (err) {
    console.error(
      "%s Project cant be installed in this folder",
      chalk.red.bold("ERROR")
    );
    process.exit(1);
  }

  const task = new Listr([
    {
      title: "Copy project files",
      task: () => copyTemplateFiles(templateDir, `${cwd}/${project.name}`),
    },
    {
      title: "Install Dependencies",
      task: () =>
        projectInstall({
          cwd: `${cwd}/${project.name}`,
        }),
    },
  ]);

  await task.run();

  console.log("%s Project Ready", chalk.green.bold("DONE"));

  console.log(chalk.blue.bold(`cd ${project.name}`));
  console.log(chalk.blue.bold("npm run dev"));
  return true;
}
