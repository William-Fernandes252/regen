/**
 * @interface Component
 * @property {string} class - The class name of the component.
 * @property {string} filename - The filename of the component.
 * @property {string} template - The template of the component.
 */
interface Component {
	name: string;
	filename: string;
	body: string;
}

type Casing = "camel" | "pascal" | "kebab" | "snake" | "upper" | "lower";

type Value = object | string | number | boolean | null | undefined;

type Placeholder = {
	value: Value;
	casing?: Casing;
};
