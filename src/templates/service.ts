import { Camel, Kebab, Pascal } from "@/utils/formats";
import { template } from "@/utils/tags";

function body(resource: string) {
	return template`import ${new Pascal(
		resource,
	)}Repository from "../repository/${new Kebab(resource)}.repository";

export default class ${new Pascal(resource)}Service {
	constructor(private readonly ${new Camel(resource)}Repository: ${new Pascal(
		resource,
	)}Repository) {}

	async create(data: any) {
		return this.${new Camel(resource)}Repository.create(data);
	}

	async update(id: number, data: any) {
		return this.${new Camel(resource)}Repository.update(id, data);
	}

	async delete(id: number) {
		return this.${new Camel(resource)}Repository.delete(id);
	}

	async read(id: number) {
		return this.${new Camel(resource)}Repository.read(id);
	}
}
`;
}

function filename(resource: string) {
	return template`${new Kebab(resource)}.service.ts`;
}

function name(resource: string) {
	return template`${new Pascal(resource)}Service`;
}

/**
 * Generates a service component for a resource.
 *
 * @param resource The name of the resource.
 * @returns The service component.
 */
export function component(resource: string): Component {
	return {
		name: name(resource).render(),
		filename: filename(resource).render(),
		body: body(resource).render(),
	};
}
