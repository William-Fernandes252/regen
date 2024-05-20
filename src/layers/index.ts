import fs from "node:fs";
import fsPromises from "node:fs/promises";

/**
 * Create the layers folders if they do not exist.
 *
 * @param basePath The absolute path to the project.
 * @param defaultMainDirectory The default main directory of the project ("src", for example).
 * @param layers The layers to be created.
 * @returns A promise that resolves when all folders are created.
 */
export async function createLayersIfNotExists(
	basePath: string,
	defaultMainDirectory: string,
	layers: string[],
) {
	const path = `${basePath}/${defaultMainDirectory}`;
	const foldersToCreate = layers.filter(
		(layer) => !fs.existsSync(`${path}/${layer}`),
	);
	return await Promise.all(
		foldersToCreate.map((folder) =>
			fsPromises.mkdir(`${path}/${folder}`, {
				recursive: true,
			}),
		),
	);
}
