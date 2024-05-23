import { template } from "@/utils/tags";

function body(resource: string) {
	return template`import ${{
		value: resource,
		casing: "pascal",
	}}Repository from "../repository/${{ value: resource, casing: "kebab" }}.repository";
import ${{ value: resource, casing: "pascal" }}Service from "../service/${{
		value: resource,
		casing: "kebab",
	}}.service";

export default class ${{ value: resource, casing: "pascal" }}Factory {
  static getInstance() {
    return new ${{ value: resource, casing: "pascal" }}Service(new ${{
			value: resource,
			casing: "pascal",
		}}Repository());
  }
}
`;
}

function filename(resource: string) {
	return template`${{ value: resource, casing: "kebab" }}.factory.ts`;
}

function name(resource: string) {
	return template`${{ value: resource, casing: "pascal" }}Factory`;
}

/**
 * Generates a factory component for a resource.
 *
 * @param resource The name of the resource.
 * @returns The factory component.
 */
export function component(resource: string): Component {
	return {
		name: name(resource),
		filename: filename(resource),
		body: body(resource),
	};
}
