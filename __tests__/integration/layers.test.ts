import fsPromises from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { defaultLayers } from "@/constants";
import { createLayersIfNotExists } from "@/layers";

describe("Layers folders structure", () => {
	const defaultMainDirectory = "src";

	let basePath: string;

	async function getFolders(...paths: string[]) {
		return await fsPromises.readdir(join(...paths));
	}

	beforeAll(async () => {
		basePath = await fsPromises.mkdtemp(join(tmpdir(), "regen-integration-"));
	});

	afterAll(() => {
		fsPromises.rm(basePath, { recursive: true });
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	it("should create folders if it does not exist", async () => {
		const before = await getFolders(basePath);

		await createLayersIfNotExists(
			basePath,
			defaultMainDirectory,
			defaultLayers,
		);

		const after = await getFolders(basePath, defaultMainDirectory);
		expect(before).not.toStrictEqual(after);
		expect(after).toStrictEqual(defaultLayers);
	});

	it("should not create folders if it already exists", async () => {
		const before = await fsPromises.readdir(basePath);

		await createLayersIfNotExists(
			basePath,
			defaultMainDirectory,
			defaultLayers,
		);

		const after = await fsPromises.readdir(basePath);
		expect(before).toStrictEqual(after);
	});
});
