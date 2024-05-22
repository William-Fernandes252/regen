import { component as factory } from "./factory";
import { component as repository } from "./repository";
import { component as service } from "./service";

export default new Map([
	["factory", factory],
	["repository", repository],
	["service", service],
]);
