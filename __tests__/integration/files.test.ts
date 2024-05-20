import fsPromises from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { defaultLayers } from "@/constants";
import { createFiles } from "@/files";
import { createLayersIfNotExists } from "@/layers";

describe("Layers folders structure", () => {
	function getFilePathForLayer(
		basePath: string,
		mainFolder: string,
		layers: string[],
		resource: string,
	) {
		return layers.map((layer) =>
			join(basePath, mainFolder, `${layer}/${resource}.${layer}.ts`),
		);
	}

	const resource = "product";
	const defaultMainDirectory = "src";
	const packageJsonMockLocation = join(
		"./__tests__/integration/mocks/package.json",
	);

	let basePath: string;

	beforeAll(async () => {
		basePath = await fsPromises.mkdtemp(join(tmpdir(), "regen-integration-"));
		await fsPromises.copyFile(
			packageJsonMockLocation,
			join(basePath, "package.json"),
		);
		await createLayersIfNotExists(
			basePath,
			defaultMainDirectory,
			defaultLayers,
		);
	});

	afterAll(() => {
		fsPromises.rm(basePath, { recursive: true });
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	it("should create repository module with the correct class having a create, read, update and delete methods", async () => {
		await createFiles(basePath, defaultMainDirectory, ["repository"], resource);
		const [filePath] = getFilePathForLayer(
			basePath,
			defaultMainDirectory,
			["repository"],
			resource,
		);

		const { default: Repository } = await import(filePath);
		const instance = new Repository();

		for (const method of ["create", "update", "delete", "read"]) {
			expect(instance[method]).toBeInstanceOf(Function);
			expect(instance[method](1)).rejects.toEqual("Method not implemented.");
		}
	});

	it("should create service module with the correct class, having a create, read, update and delete methods that calls the repository methods", async () => {
		await createFiles(
			basePath,
			defaultMainDirectory,
			["repository", "service"],
			resource,
		);

		const [repositoryPath, servicePath] = getFilePathForLayer(
			basePath,
			defaultMainDirectory,
			["repository", "service"],
			resource,
		);
		const repository = new (await import(repositoryPath)).default();
		const service = new (await import(servicePath)).default(repository);

		for (const method of ["create", "update", "delete", "read"]) {
			expect(service[method]).toBeInstanceOf(Function);

			const mockReturn = "mocked";
			const spy = jest
				.spyOn(repository, method)
				.mockResolvedValueOnce(mockReturn);

			const args = {
				create: [{}],
				update: [1, {}],
				delete: [1],
				read: [1],
			} as Record<string, unknown[]>;
			expect(await service[method](...args[method])).toBe(mockReturn);
			expect(spy).toHaveBeenCalledWith(...args[method]);
		}
	});

	it("should create factory that match layers", async () => {
		await createFiles(
			basePath,
			defaultMainDirectory,
			["repository", "service", "factory"],
			resource,
		);

		const [repositoryPath, servicePath, factoryPath] = getFilePathForLayer(
			basePath,
			defaultMainDirectory,
			["repository", "service", "factory"],
			resource,
		);

		const { default: Repository } = await import(repositoryPath);
		const { default: Service } = await import(servicePath);
		const factory = (await import(factoryPath)).default;

		const service = factory.getInstance();

		const expected = new Service(new Repository());
		expect(service).toMatchObject(expected);
		expect(service).toBeInstanceOf(Service);
	});
});
