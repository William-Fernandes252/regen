import type { Case } from "./formats";

/**
 * Return a template literal tag function that can be used to render a component.
 *
 * @param strings The strings of the template literal
 * @param placeholders The placeholders on the template literal
 * @returns A function that will parse the placeholders based on the given values
 *
 * @example
 * const repository = template`class ${{ value: "product", case: "pascal"}}Repository {}`
 * console.log(repository()) // class ProductRepository {}
 */
export function template(
	strings: TemplateStringsArray,
	...placeholders: Array<Case | string | undefined | null>
): Template.Result {
	const result: string[] = [];

	function clean() {
		result.length = 0;
	}

	function doRender() {
		clean();
		result.push(strings[0]);
		placeholders.forEach((placeholder, i) => {
			const value = (placeholder || "").toString();
			result.push(value);
			result.push(strings[i + 1]);
		});
		return result.join("");
	}

	const methods = {
		render: () => doRender(),
		compose: <U>(next: (input: string) => U) => {
			const composed = () => next(doRender());
			return Object.assign(composed, {
				thenRender: () => next(doRender()),
			});
		},
	} as const;

	const handler: ProxyHandler<() => string> = {
		apply(_target, _thisArg, _args) {
			return doRender();
		},
		get(_target, prop) {
			if (prop in methods) {
				return methods[prop as keyof typeof methods];
			}
		},
	};

	return new Proxy(() => doRender(), handler) as Template.Result;
}
