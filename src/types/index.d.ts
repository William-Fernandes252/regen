interface Component {
	name: string;
	filename: string;
	body: string;
}

declare namespace Template {
	type Value = string | number | boolean | null | undefined;

	interface Result {
		/**
		 * Call the `render` method to get the resulting template.
		 */
		(): string;

		/**
		 * Render the template with the given placeholders.
		 */
		render(): string;

		/**
		 * Compose the template with the given function.
		 *
		 * This function will be called with the rendered template as input.
		 *
		 * @template U - The type of the result of the next function.
		 */
		compose<U>(next: (input: string) => U): Result & { thenRender: () => U };
	}
}

type Layer = "service" | "repository" | "factory";
