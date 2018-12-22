import * as program from "commander";
import * as path from "path";
import * as os from "os";
import * as fs from "fs-extra";
import {
  createKey,
  createPassword,
  createSeed,
  templates
} from "@masterpassx/core";
import * as inquirer from "inquirer";

(async () => {
  // Setup program
  program
    .version(require("../package.json").version)
    .usage("[options] <site>")
    .option("-t, --template <template>", "Set template (default: long)", "long")
    .option("-c, --counter <counter>", "Set counter (default: 1)", parseInt, 1)
    .option("-r, --reset", "Reset user information", false)
    .option("-n, --no-save", "Don't save user information", false)
    .option(
      "-p, --config-path <path>",
      "Path to config (default: ~/.config/masterpassx)",
      path.join(os.homedir(), ".config", "masterpassx")
    )
    .parse(process.argv);

  const { configPath, reset, save, counter } = program;
  let template = program.template || "long";

  const errors = [];

  if (template.startsWith("-")) template = template.substring(1);

  switch (template) {
    case "x":
      template = "maximum";
      break;
    case "l":
      template = "long";
      break;
    case "m":
      template = "medium";
      break;
    case "b":
      template = "basic";
      break;
    case "s":
      template = "short";
      break;
    case "i":
      template = "pin";
      break;
    case "n":
      template = "name";
      break;
    case "p":
      template = "phrase";
      break;
    case "K":
      // TODO: not implemented
      template = "key";
      break;
    case "P":
      // TODO: not implemented
      template = "personal";
      break;
  }

  if (!Object.keys(templates).includes(template)) {
    errors.push(
      "Template is invalid. Choose from: " +
        Object.keys(templates).join(", ") +
        ". (default: long)"
    );
  }

  if (isNaN(counter) || counter < 1) {
    errors.push(
      "Counter is invalid. Please use an integer higher or equal to 1. (default: 1)"
    );
  }

  if (save && !configPath) {
    errors.push("Config path is invalid. (default: ~/.config/masterpassx)");
  }

  if (errors.length > 0) {
    errors.forEach(error => console.warn(error));
    return;
  }

  let config;
  if (!reset) {
    try {
      config = await fs.readJson(configPath);
    } catch (error) {
      if (error.code !== "ENOENT") {
        console.warn(error);
      }
    }
  }

  if (config == null || !config.name || !config.key) {
    console.warn("You must first setup your user for MasterPassX!");

    const { name, masterPassword } = await inquirer.prompt<{
      name: string;
      masterPassword: string;
    }>([
      {
        type: "input",
        name: "name",
        message: "Enter Full Name"
      },
      {
        type: "password",
        name: "masterPassword",
        message: "Enter Master Password",
        mask: "*"
      }
    ]);

    const key = await createKey(name, masterPassword);
    config = { name, key };
    if (save) {
      await fs.mkdirp(path.dirname(configPath));
      await fs.writeJson(configPath, config);
      console.warn("Saved user!");
    }
  }

  let site = program.args[0];

  while (!site) {
    site = (await inquirer.prompt<{ site: string }>([
      {
        type: "input",
        name: "site",
        message: "Enter Site"
      }
    ])).site;

    if (!site) {
      console.warn("Invalid site.");
    }
  }

  const seed = createSeed(config.key, site, counter);
  const password = createPassword(seed, template);

  console.warn("Password for '" + site + "':");
  console.log(password);
})();
