#!/usr/bin/env node

import fsPromises from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import { defaultLayers } from "./constants";
import { createFiles } from "./files";
import { createLayersIfNotExists } from "./layers";

const { argv } = yargs(hideBin(process.argv)).command(
	"scaffold",
	"Scaffold a new resource in your project.",
	(yargs) => {
		yargs
			.option("resource", {
				alias: "r",
				type: "array",
				description: "The name of the resource to scaffold",
				demandOption: true,
			})
			.example(
				"scaffold -r product",
				'Scaffold a project with a single "product" domain',
			)
			.example(
				"scaffold -r product -r user",
				'Scaffold a project with two domains: "product" and "user"',
			)
			.epilog("For more information, visit the documentation.");
	},
);

const defaultMainDirectory =
	process.env.NODE_ENV === "dev"
		? await fsPromises.mkdtemp(join(tmpdir(), "regen-integration-"))
		: "src";
const basePath = process.env.NODE_ENV === "dev" ? "" : process.cwd();

await createLayersIfNotExists(basePath, defaultMainDirectory, defaultLayers);

try {
	await Promise.all(
		((await argv).resource as string[]).map(async (resource: string) => {
			createFiles(basePath, defaultMainDirectory, defaultLayers, resource);
		}),
	);
} catch (error) {
	console.error("An error occurred while scaffolding the resource.");
	console.error(error);
}
