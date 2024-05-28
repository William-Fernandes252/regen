import { commands } from "@/commands";
import { defaultLayers, defaultMainDirectory } from "@/constants";
import * as files from "@/files";
import * as layers from "@/layers";
import yargs from "yargs";

describe("Scaffold command", () => {
	let parser: yargs.Argv;
	const resources = ["product", "user"];

	beforeEach(() => {
		parser = yargs.command(commands);
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	it("should return help output", async () => {
		parser.help();
		const output = await new Promise((resolve, reject) => {
			parser.parse("--help", {}, (error, _, output) => {
				if (error) {
					reject(error);
				}
				resolve(output);
			});
		});
		expect(output).toBeDefined();
	});

	describe("Success", () => {
		let createLayersSpy: jest.SpyInstance;
		let createFilesSpy: jest.SpyInstance;

		beforeEach(() => {
			createLayersSpy = jest
				.spyOn(layers, "createLayersIfNotExists")
				.mockResolvedValue([]);
			createFilesSpy = jest
				.spyOn(files, "createFiles")
				.mockResolvedValue({ success: true });
		});

		it("should scaffold a new resource", async () => {
			await new Promise((resolve, reject) => {
				parser.parse(
					`scaffold ${resources.map((resource) => `-r ${resource}`).join(" ")}`,
					{},
					(error, _, output) => {
						if (error) {
							reject(error);
						}
						resolve(output);
					},
				);
			});
			expect(createLayersSpy).toHaveBeenCalledWith(
				process.cwd(),
				defaultMainDirectory,
				defaultLayers,
			);
			for (const resource of resources) {
				expect(createFilesSpy).toHaveBeenCalledWith(
					process.cwd(),
					defaultMainDirectory,
					defaultLayers,
					resource,
				);
			}
		});

		it("should scaffold a new service", async () => {
			await new Promise((resolve, reject) => {
				parser.parse(
					`scaffold -s ${resources.at(0)}`,
					{},
					(error, _, output) => {
						if (error) {
							reject(error);
						}
						resolve(output);
					},
				);
			});
			expect(createLayersSpy).toHaveBeenCalledWith(
				process.cwd(),
				defaultMainDirectory,
				defaultLayers,
			);
			expect(createFilesSpy).toHaveBeenCalledWith(
				process.cwd(),
				defaultMainDirectory,
				["service"].toSorted(),
				resources.at(0),
			);
		});

		it("should not log errors on success", async () => {
			const spy = jest.spyOn(console, "error").mockImplementation(() => {});
			await new Promise((resolve, reject) => {
				parser.parse(
					`scaffold ${resources.map((resource) => `-r ${resource}`).join(" ")}`,
					{},
					(error, _, output) => {
						if (error) {
							reject(error);
						}
						resolve(output);
					},
				);
			});
			expect(spy).not.toHaveBeenCalled();
		});
	});

	describe("Error", () => {
		let createLayersSpy: jest.SpyInstance;
		let createFilesSpy: jest.SpyInstance;

		beforeEach(() => {
			createLayersSpy = jest
				.spyOn(layers, "createLayersIfNotExists")
				.mockResolvedValue([]);
			createFilesSpy = jest
				.spyOn(files, "createFiles")
				.mockResolvedValue({ success: false, message: "An error occurred." });
		});

		it("should catch and log the error", async () => {
			const spy = jest.spyOn(console, "error").mockImplementation(() => {});
			await new Promise((resolve, reject) => {
				parser.parse(
					`scaffold ${resources.map((resource) => `-r ${resource}`).join(" ")}`,
					{},
					(error, _, output) => {
						if (error) {
							reject(error);
						}
						resolve(output);
					},
				);
			});
			expect(spy).toHaveBeenCalledWith("Error: ", "An error occurred.");
		});
	});
});
