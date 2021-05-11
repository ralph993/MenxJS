import arg from "arg";
import inquirer from "inquirer";
import { createProject } from "./main";
import { mkdir } from "fs";

const cwd = process.cwd();

function parseArgIntoOptions(rawArgs) {
  const args = arg(
    {
      "--git": Boolean,
      "--yes": Boolean,
      "--install": Boolean,
      "-g": "--git",
      "-y": "--yes",
      "-i": "--install",
    },
    {
      argv: rawArgs.slice(2),
    }
  );
  return {
    skipPrompts: args["--yes"] || false,
    git: args["--git"] || false,
    template: args._[0],
    runInstall: args["--install"] || false,
  };
}
export function cli(arg) {
  let options = parseArgIntoOptions(arg);

  if (options.template == "create") {
    inquirer
      .prompt([
        {
          type: "input",
          message: "preject name:",
          name: "name",
          default: "new-api",
        },
        {
          type: "input",
          message: "author:",
          name: "author",
        },
        {
          type: "input",
          message: "license:",
          name: "license",
          default: "MIT",
        },
        {
          type: "input",
          message: "description:",
          name: "desc",
        },
        {
          type: "input",
          message: "mongo URI:",
          name: "mUri",
        },
      ])

      .then((awns) => {
        createProject(awns);

        /* package.name = name;
        package.author = author;
        package.license = license;
        package.description = desc;

        mkdir(`${cwd}/${name}`, (err) => {
          if (err) throw err;
        });

        writeFileSync(`${cwd}/${name}/package.json`, JSON.stringify(package));

        ncp(temp, `${cwd}/${name}`, function (err) {
          if (err) {
            return console.error(err);
          }
        });

        shell.cd(`${cwd}/${name}`);
        shell.exec("npm i express mongoose path cookie-parser morgan colors");
        shell.exec("npm i -D dotenv inquirer commander");
        console.log("done!");  */
      });
  }
}
