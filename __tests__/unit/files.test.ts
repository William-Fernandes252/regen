import fsPromises from "node:fs/promises";
import { createFiles } from "@/files";
import templates from "@/templates";

describe("Files structure", () => {
	const resource = "product";

	beforeEach(() => {
		templates.forEach((_, key) => {
			templates.set(
				key,
				jest.fn().mockReturnValue({
					name: "",
					body: "",
					filename: "",
				}),
			);
		});
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	it("should not create a file structure on inexistent layers", async () => {
		const expected = {
			error: `Template for layer "infrastructure" not found.`,
		};
		const result = await createFiles(
			"",
			"src",
			["infrastructure", "domain"],
			resource,
		);
		expect(result).toEqual(expected);
	});

	it("should add files for the specified layers", async () => {
		const layers = ["repository"];

		const spy = jest.spyOn(fsPromises, "writeFile").mockResolvedValue();

		const expected = {
			success: true,
		};

		const result = await createFiles("", "src", layers, resource);
		expect(result).toStrictEqual(expected);
		expect(spy).toHaveBeenCalledTimes(layers.length);
		expect(templates.get("repository")).toHaveBeenCalledWith(resource);
	});

	it("should not add file for extra layers", async () => {
		jest.spyOn(fsPromises, "writeFile").mockResolvedValue();

		const expected = {
			success: true,
		};

		const result = await createFiles("", "src", ["repository"], resource);
		expect(result).toStrictEqual(expected);
		expect(templates.get("service")).not.toHaveBeenCalled();
	});

	it("should return an error if the file creation fails", async () => {
		const error = new Error("File creation failed");
		jest.spyOn(fsPromises, "writeFile").mockRejectedValue(error);

		const expected = {
			error: error.message,
		};

		const result = await createFiles("", "src", ["repository"], resource);
		expect(result).toStrictEqual(expected);
	});
});
