import fsPromises from "node:fs/promises";
import templates from "@/templates";

/**
 * Create the layers folders if they do not exist.
 *
 * @param basePath The absolute path to the project.
 * @param defaultMainDirectory The default main directory of the project ("src", for example).
 * @param layers The layers to be created.
 * @param resource The name of the component to be created.
 * @returns A promise that resolves when all folders are created.
 */
export async function createFiles(
	basePath: string,
	defaultMainDirectory: string,
	layers: string[],
	resource: string,
) {
	const keys = [...templates.keys()];
	const promises: ReturnType<(typeof fsPromises)["writeFile"]>[] = [];

	for (const layer of layers) {
		const component = templates.get(
			keys.find((key) => key.includes(layer)) || "",
		);
		if (!component) {
			return {
				success: false,
				message: `Template for layer "${layer}" not found.`,
			};
		}

		const folderPath = `${basePath}/${defaultMainDirectory}/${layer}`;
		const { filename, body } = component(resource);
		promises.push(fsPromises.writeFile(`${folderPath}/${filename}`, body));
	}

	try {
		await Promise.all(promises);
	} catch (error) {
		return { success: false, message: (error as Error).message };
	}

	return { success: true };
}
