import { template } from "@/utils/tags";

describe("tags", () => {
	describe("template", () => {
		it("should parse a placeholder based on the given values", () => {
			for (const [casing, expected] of [
				["camel", "camelCase"],
				["pascal", "PascalCase"],
				["kebab", "kebab-case"],
				["snake", "snake_case"],
				["upper", "UPPER CASE"],
				["lower", "lower case"],
				[undefined, "undefined case"],
				[null, ""],
			] as [Template.Casing, string][]) {
				const result = template`${{
					value: expected ? `${casing} case` : null,
					casing,
				}}`;
				expect(result).toStrictEqual(expected);
			}
		});

		it("should work as the example", () => {
			const result = template`class ${{
				value: "user",
				casing: "pascal",
			}}Repository {}`;
			expect(result).toStrictEqual("class UserRepository {}");
		});
	});
});
