import { template } from "@/utils/tags";

function body(resource: string) {
	return template`export default class ${{ value: resource, casing: "pascal" }}Repository {
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
}

function filename(resource: string, casing: Casing = "kebab") {
	return template`${{ value: resource, casing: casing }}.repository.ts`;
}

function name(resource: string) {
	return template`${{ value: resource, casing: "pascal" }}Repository`;
}

/**
 * Generates a repository component for a resource.
 *
 * @param resource The name of the resource.
 * @returns The repository component.
 */
export function component(resource: string): Component {
	return {
		name: name(resource),
		filename: filename(resource),
		body: body(resource),
	};
}
