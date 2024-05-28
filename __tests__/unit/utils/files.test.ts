import fsPromises from "node:fs/promises";
import os from "node:os";
import { getDefaultMainDirectory } from "@/utils/files";

describe("getDefaultMainDirectory", () => {
	it("should return the default main directory", async () => {
		const result = await getDefaultMainDirectory();
		expect(result).toBe("src");
	});

	it("should return a temporary directory when in development mode", async () => {
		process.env.NODE_ENV = "dev";
		jest.spyOn(os, "tmpdir").mockReturnValue("/tmp");
		jest
			.spyOn(fsPromises, "mkdtemp")
			.mockResolvedValue("/tmp/regen-integration-1234");
		const result = await getDefaultMainDirectory();
		expect(result).toContain("regen-integration-");
	});
});
