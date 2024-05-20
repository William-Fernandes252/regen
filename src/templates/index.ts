import { generateFactory } from "./factory";
import { generateRepository } from "./repository";
import { generateService } from "./service";

export default new Map<string, (resource: string) => Component>([
	["repository", generateRepository],
	["service", generateService],
	["factory", generateFactory],
]);
