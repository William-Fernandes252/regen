import { capitalize, uncapitalize } from "@/utils/strings";

const resourceAnchor = "$$resource";

const template = `
import ${resourceAnchor}Repository from "../repository/${resourceAnchor}|lower.repository";

export default class ${resourceAnchor}Service {
	constructor(private readonly ${resourceAnchor}|lowerRepository: ${resourceAnchor}Repository) {}

	async create(data: any) {
		return this.${resourceAnchor}|lowerRepository.create(data);
	}

	async update(id: number, data: any) {
		return this.${resourceAnchor}|lowerRepository.update(id, data);
	}

	async delete(id: number) {
		return this.${resourceAnchor}|lowerRepository.delete(id);
	}

	async read(id: number) {
		return this.${resourceAnchor}|lowerRepository.read(id);
	}
}
`;

/**
 * Generates a service component for a resource.
 *
 * @param resource The name of the resource.
 * @returns The service component.
 */
export function generateService(resource: string): Component {
	return {
		class: `${capitalize(resource)}Service`,
		filename: `${resource}.service.ts`,
		template: template
			.replaceAll(`${resourceAnchor}|lower`, uncapitalize(resource))
			.replaceAll(resourceAnchor, `${capitalize(resource)}`),
	};
}
