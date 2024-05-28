import fsPromises from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";

export async function getDefaultMainDirectory() {
	return process.env.NODE_ENV === "dev"
		? await fsPromises.mkdtemp(join(tmpdir(), "regen-integration-"))
		: "src";
}
