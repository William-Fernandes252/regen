import fs from "node:fs";
import fsPromises from "node:fs/promises";
import { defaultLayers } from "@/constants";
import { createLayersIfNotExists } from "@/layers";

describe("Layers folders structure", () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	it("should create folders if it does not exist", async () => {
		const mkdirSpy = jest.spyOn(fsPromises, "mkdir").mockResolvedValue("");
		const existsSyncSpy = jest.spyOn(fs, "existsSync").mockReturnValue(false);

		await createLayersIfNotExists("", "src", defaultLayers);

		expect(existsSyncSpy).toHaveBeenCalledTimes(defaultLayers.length);
		expect(mkdirSpy).toHaveBeenCalledTimes(defaultLayers.length);
	});

	it("should not create folders if it already exists", async () => {
		const mkdirSpy = jest.spyOn(fsPromises, "mkdir").mockResolvedValue("");
		const existsSyncSpy = jest.spyOn(fs, "existsSync").mockReturnValue(true);

		await createLayersIfNotExists("", "src", defaultLayers);

		expect(existsSyncSpy).toHaveBeenCalledTimes(defaultLayers.length);
		expect(mkdirSpy).not.toHaveBeenCalled();
	});
});
