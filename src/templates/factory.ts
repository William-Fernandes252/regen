import { capitalize, uncapitalize } from "@/utils/strings";

const resourceAnchor = "$$resource";

const template = `
import ${resourceAnchor}Repository from "../repository/${resourceAnchor}|lower.repository";
import ${resourceAnchor}Service from "../service/${resourceAnchor}|lower.service";

export default class ${resourceAnchor}Factory {
  static getInstance() {
    return new ${resourceAnchor}Service(new ${resourceAnchor}Repository());
  }
}
`;

/**
 * Generates a factory component for a resource.
 *
 * @param resource The name of the resource.
 * @returns The factory component.
 */
export function generateFactory(resource: string): Component {
	return {
		class: `${capitalize(resource)}Factory`,
		filename: `${resource}.factory.ts`,
		template: template
			.replaceAll(`${resourceAnchor}|lower`, uncapitalize(resource))
			.replaceAll(resourceAnchor, `${capitalize(resource)}`),
	};
}
