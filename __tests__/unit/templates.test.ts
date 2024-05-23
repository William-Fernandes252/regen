import templates from "@/templates";
import { template } from "@/utils/tags";
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
		const expected: Component = {
			filename: template`${{ value: resource, casing: "kebab" }}.repository.ts`,
			body: repositoryTemplateMock,
			name: template`${{ value: resource, casing: "pascal" }}Repository`,
		};

		const result = templates.get("repository")?.(resource);

		expect(result).toEqual(expected);
		expect(result?.body).toContain(`export default class ${result?.name}`);
	});

	it("should generate a service template", () => {
		const expected: Component = {
			filename: template`${{ value: resource, casing: "kebab" }}.service.ts`,
			body: serviceTemplateMock,
			name: template`${{ value: resource, casing: "pascal" }}Service`,
		};

		const result = templates.get("service")?.(resource);

		expect(result).toEqual(expected);
		expect(result?.body).toContain(
			template`import ${{
				value: resource,
				casing: "pascal",
			}}Repository from "../repository/${{
				value: resource,
				casing: "kebab",
			}}.repository";`,
		);
		expect(result?.body).toContain(`export default class ${result?.name}`);
	});

	it("should generate a factory template", () => {
		const expected: Component = {
			filename: template`${{ value: resource, casing: "kebab" }}.factory.ts`,
			body: factoryTemplateMock,
			name: template`${{ value: resource, casing: "pascal" }}Factory`,
		};

		const result = templates.get("factory")?.(resource);

		expect(result).toEqual(expected);
		expect(result?.body).toContain(
			template`import ${{
				value: resource,
				casing: "pascal",
			}}Repository from "../repository/${{
				value: resource,
				casing: "kebab",
			}}.repository";`,
		);
		expect(result?.body).toContain(
			template`import ${{
				value: resource,
				casing: "pascal",
			}}Service from "../service/${{
				value: resource,
				casing: "kebab",
			}}.service";`,
		);
		expect(result?.body).toContain(`export default class ${result?.name}`);
	});
});
