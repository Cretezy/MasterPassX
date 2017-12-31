import program from "commander";
import path from "path";
import os from "os";
import fs from "fs";
import util from "util";
import core from "masterpassx-core/dist/index.cjs";
import inquirer from "inquirer";

const { templates, createKey, createSeed, createPassword } = core;

(async () => {
	// Setup program
	program
		.version("0.1.4")
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

	const reset = !!program.reset;
	const save = !!program.save;
	const configPath = program.configPath;
	const template = program.template || "long";
	const counter = program.counter;

	const errors = [];

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
		errors.forEach(error => console.log(error));
		return;
	}

	let config = null;
	if (!reset) {
		try {
			config = JSON.parse(
				await util.promisify(fs.readFile)(configPath, "utf8")
			);
		} catch (err) {
			console.log(err);
		}
	}
	if (config === null || !config.name || !config.key) {
		console.log("You must first setup your user for MasterPassX!");

		const { name, masterPassword } = await inquirer.prompt([
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
			await mkdirp(configPath);
			await util.promisify(fs.writeFile)(configPath, JSON.stringify(config));
			console.log("Saved user!");
		}
	}

	const site =
		program.args[0] ||
		(await inquirer.prompt([
			{
				type: "input",
				name: "site",
				message: "Enter Site"
			}
		])).site;

	if (!site) {
		console.log("Invalid site.");
		return;
	}

	const seed = createSeed(config.key, site, counter);
	const password = createPassword(seed, template);

	console.log("Password for '" + site + "':");
	console.log(password);
})();

async function mkdirp(filepath) {
	const dirname = path.dirname(filepath);
	if (!await util.promisify(fs.exists)(dirname)) {
		await mkdirp(dirname);
		await util.promisify(fs.mkdir)(filepath);
	}
}
