import { Kebab, Pascal } from "@/utils/formats";
import { template } from "@/utils/tags";

function body(resource: string) {
	return template`import ${new Pascal(
		resource,
	)}Repository from "../repository/${new Kebab(resource)}.repository";
import ${new Pascal(resource)}Service from "../service/${new Kebab(resource)}.service";

export default class ${new Pascal(resource)}Factory {
  static getInstance() {
    return new ${new Pascal(resource)}Service(new ${new Pascal(resource)}Repository());
  }
}
`;
}

function filename(resource: string) {
	return template`${new Kebab(resource)}.factory.ts`;
}

function name(resource: string) {
	return template`${new Pascal(resource)}Factory`;
}

/**
 * Generates a factory component for a resource.
 *
 * @param resource The name of the resource.
 * @returns The factory component.
 */
export function component(resource: string): Component {
	return {
		name: name(resource).render(),
		filename: filename(resource).render(),
		body: body(resource).render(),
	};
}
