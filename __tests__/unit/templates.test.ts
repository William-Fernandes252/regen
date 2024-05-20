import templates from "@/templates";
import { capitalize } from "@/utils/strings";
import {
	factoryTemplateMock,
	repositoryTemplateMock,
	serviceTemplateMock,
} from "./mocks";

describe("Code generation", () => {
	const resource = "product";

	beforeEach(() => {
		jest.clearAllMocks();
	});

	it("should generate a repository template", () => {
		const expected = {
			filename: `${resource}.repository.ts`,
			template: repositoryTemplateMock,
			class: `${[resource.charAt(0).toUpperCase(), resource.slice(1)].join(
				"",
			)}Repository`,
		};

		const result = templates.get("repository")?.(resource);

		expect(result).toEqual(expected);
		expect(result?.template).toContain(`export default class ${result?.class}`);
	});

	it("should generate a service template", () => {
		const expected = {
			filename: `${resource}.service.ts`,
			template: serviceTemplateMock,
			class: `${capitalize(resource)}Service`,
		};

		const result = templates.get("service")?.(resource);

		expect(result).toEqual(expected);
		expect(result?.template).toContain(
			`import ${capitalize(
				resource,
			)}Repository from "../repository/${resource}.repository";`,
		);
		expect(result?.template).toContain(`export default class ${result?.class}`);
	});

	it("should generate a factory template", () => {
		const expected = {
			filename: `${resource}.factory.ts`,
			template: factoryTemplateMock,
			class: `${capitalize(resource)}Factory`,
		};

		const result = templates.get("factory")?.(resource);

		expect(result).toEqual(expected);
		expect(result?.template).toContain(
			`import ${capitalize(
				resource,
			)}Repository from "../repository/${resource}.repository";`,
		);
		expect(result?.template).toContain(
			`import ${capitalize(
				resource,
			)}Service from "../service/${resource}.service";`,
		);
		expect(result?.template).toContain(`export default class ${result?.class}`);
	});
});
