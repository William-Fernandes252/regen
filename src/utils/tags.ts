/**
 * Return a string interpolated with the given values formatted.
 *
 * @param strings The strings of the template literal
 * @param placeholders The placeholders on the template literal
 * @returns A function that will parse the placeholders based on the given values
 * @example
 * const repository = template`class ${{ value: "product", case: "pascal"}}Repository {}`
 * console.log(repository()) // class ProductRepository {}
 */
export function template(
	strings: TemplateStringsArray,
	...placeholders: Template.Placeholder[]
): string {
	const result = [strings[0]];
	placeholders.forEach((placeholder, i) => {
		const value = (placeholder.value || "").toString();
		switch (placeholder.casing) {
			case "camel":
				result.push(
					value
						.toLowerCase()
						.split(/[^a-zA-Z0-9]+/)
						.map((word, index) => {
							if (index === 0) {
								return word;
							}
							return word.charAt(0).toUpperCase() + word.slice(1);
						})
						.join(""),
				);
				break;
			case "pascal":
				result.push(
					value
						.toLowerCase()
						.split(/[^a-zA-Z0-9]+/)
						.map((word) => {
							return word.charAt(0).toUpperCase() + word.slice(1);
						})
						.join(""),
				);
				break;
			case "kebab":
				result.push(
					value
						.toLowerCase()
						.split(/[^a-zA-Z0-9]+/)
						.filter((word) => word.length > 0)
						.join("-"),
				);
				break;
			case "snake":
				result.push(
					value
						.toLowerCase()
						.split(/[^a-zA-Z0-9]+/)
						.filter((word) => word.length > 0)
						.join("_"),
				);
				break;
			case "upper":
				result.push(value.toUpperCase());
				break;
			case "lower":
				result.push(value.toLowerCase());
				break;
			default:
				result.push(value);
		}
		result.push(strings[i + 1]);
	});
	return result.join("");
}
