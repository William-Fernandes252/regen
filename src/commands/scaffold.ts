import { createFiles } from "@/files";
import { createLayersIfNotExists } from "@/layers";
import { getDefaultMainDirectory } from "@/utils/files";
import type yargs from "yargs";
import { basePath, defaultLayers } from "../constants";

/**
 * @property {Array} resource The name of the resource to scaffold
 * @property {Array} service The name of the service to scaffold
 * @property {Array} repository The name of the repository to scaffold
 * @property {string} baseDir The base directory for the project
 * @property {string} mainDir The main directory for the project
 */
type A = {
	resource: string[];
	service: string[];
	repository: string[];
	"base-dir": string;
	"main-dir": string;
};

const command = "scaffold";

const describe = "Scaffold a new resource in your project.";

const builder = (yargs: yargs.Argv) =>
	yargs
		.usage("$0 scaffold [options]")
		.option("resource", {
			alias: "r",
			type: "array",
			description: "The name of the resource to scaffold",
			default: [],
		})
		.option("service", {
			alias: "s",
			type: "array",
			description: "The name of the service to scaffold",
			default: [],
		})
		.option("repository", {
			alias: "p",
			type: "array",
			description: "The name of the repository to scaffold",
			default: [],
		})
		.option("base-dir", {
			alias: "b",
			type: "string",
			description: "The base directory for the project",
			default: basePath,
		})
		.option("main-dir", {
			alias: "m",
			type: "string",
			description: "The main directory for the project",
			default: "src",
		})
		.example(
			"scaffold -r product",
			'Scaffold a project with a single "product" domain',
		)
		.example(
			"scaffold -r product -r user",
			'Scaffold a project with two domains: "product" and "user"',
		)
		.example(
			"scaffold -s product ",
			'Scaffold a project with a single "product" service',
		)
		.epilog("For more information, visit the documentation.");

const handler = async (args: yargs.ArgumentsCamelCase<A>): Promise<void> => {
	const defaultMainDirectory = await getDefaultMainDirectory();

	await createLayersIfNotExists(
		args["base-dir"],
		args["main-dir"],
		defaultLayers,
	);

	const results = await Promise.all([
		...args.resource.map(async (resource) => {
			return createFiles(
				args["base-dir"],
				args["main-dir"],
				defaultLayers,
				resource,
			);
		}),
		...args.service.map(async (service) => {
			return createFiles(
				args["base-dir"],
				args["main-dir"],
				["service"],
				service,
			);
		}),
	]);

	for (const result of results) {
		if (!result.success) {
			console.error("Error: ", result.message);
			break;
		}
	}
};

export default {
	command,
	describe,
	builder,
	handler,
} as yargs.CommandModule<unknown, A>;
