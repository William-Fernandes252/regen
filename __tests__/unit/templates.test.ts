import templates from "@/templates";
import { Kebab, Pascal } from "@/utils/formats";
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
			filename: template`${new Kebab(resource)}.repository.ts`(),
			body: repositoryTemplateMock,
			name: template`${new Pascal(resource)}Repository`(),
		};

		const result = templates.get("repository")?.(resource);

		expect(result).toEqual(expected);
		expect(result?.body).toContain(`export default class ${result?.name}`);
	});

	it("should generate a service template", () => {
		const expected: Component = {
			filename: template`${new Kebab(resource)}.service.ts`(),
			body: serviceTemplateMock,
			name: template`${new Pascal(resource)}Service`(),
		};

		const result = templates.get("service")?.(resource);

		expect(result).toEqual(expected);
		expect(result?.body).toContain(
			template`import ${new Pascal(
				resource,
			)}Repository from "../repository/${new Kebab(resource)}.repository";`(),
		);
		expect(result?.body).toContain(`export default class ${result?.name}`);
	});

	it("should generate a factory template", () => {
		const expected: Component = {
			filename: template`${new Kebab(resource)}.factory.ts`(),
			body: factoryTemplateMock,
			name: template`${new Pascal(resource)}Factory`(),
		};

		const result = templates.get("factory")?.(resource);

		expect(result).toEqual(expected);
		expect(result?.body).toContain(
			template`import ${new Pascal(
				resource,
			)}Repository from "../repository/${new Kebab(resource)}.repository";`(),
		);
		expect(result?.body).toContain(
			template`import ${new Pascal(
				resource,
			)}Service from "../service/${new Kebab(resource)}.service";`(),
		);
		expect(result?.body).toContain(`export default class ${result?.name}`);
	});
});
