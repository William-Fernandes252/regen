import { capitalize } from "@/utils/strings";

const resourceAnchor = "$$resource";

const template = `
export default class ${resourceAnchor}Repository {
	constructor() {}

	async create(data: any) {
		return Promise.reject("Method not implemented.");
	}

	async update(id: number, data: any) {
		return Promise.reject("Method not implemented.");
	}

	async delete(id: number) {
		return Promise.reject("Method not implemented.");
	}

	async read(id: number) {
		return Promise.reject("Method not implemented.");
	}
}
`;

/**
 * Generates a repository component for a resource.
 *
 * @param resource The name of the resource.
 * @returns The repository component.
 */
export function generateRepository(resource: string): Component {
	return {
		class: `${capitalize(resource)}Repository`,
		filename: `${resource}.repository.ts`,
		template: template.replaceAll(resourceAnchor, capitalize(resource)),
	};
}
