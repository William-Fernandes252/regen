import { template } from "@/utils/tags";

function body(resource: string) {
	return template`import ${{
		value: resource,
		casing: "pascal",
	}}Repository from "../repository/${{
		value: resource,
		casing: "kebab",
	}}.repository";

export default class ${{ value: resource, casing: "pascal" }}Service {
	constructor(private readonly ${{
		value: resource,
		casing: "camel",
	}}Repository: ${{
		value: resource,
		casing: "pascal",
	}}Repository) {}

	async create(data: any) {
		return this.${{ value: resource, casing: "camel" }}Repository.create(data);
	}

	async update(id: number, data: any) {
		return this.${{ value: resource, casing: "camel" }}Repository.update(id, data);
	}

	async delete(id: number) {
		return this.${{ value: resource, casing: "camel" }}Repository.delete(id);
	}

	async read(id: number) {
		return this.${{ value: resource, casing: "camel" }}Repository.read(id);
	}
}
`;
}

function filename(
	resource: string,
	casing: Extract<Template.Casing, "kebab" | "camel"> = "kebab",
) {
	return template`${{
		value: resource,
		casing: casing,
	}}.service.ts`;
}

function name(resource: string) {
	return template`${{
		value: resource,
		casing: "pascal",
	}}Service`;
}

/**
 * Generates a service component for a resource.
 *
 * @param resource The name of the resource.
 * @returns The service component.
 */
export function component(resource: string): Component {
	return {
		name: name(resource),
		filename: filename(resource),
		body: body(resource),
	};
}
