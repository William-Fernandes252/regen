import {
	Camel,
	type Case,
	Kebab,
	Lower,
	Pascal,
	Snake,
	Upper,
} from "@/utils/formats";
import { template } from "@/utils/tags";

describe("tags", () => {
	describe("template", () => {
		it("should parse a placeholder based on the given values", () => {
			for (const [Format, expected] of [
				[Camel, "camelCase"],
				[Pascal, "PascalCase"],
				[Kebab, "kebab-case"],
				[Snake, "snake_case"],
				[Upper, "UPPER CASE"],
				[Lower, "lower case"],
			] as [new (value: string) => Case, string][]) {
				const result = template`${new Format(`${Format.name} case`)}`();
				expect(result).toStrictEqual(expected);
			}
		});

		it("should ignore falsy values", () => {
			const result = template`${new Pascal(
				"user",
			)}${undefined}${null}Repository`();
			expect(result).toStrictEqual("UserRepository");
		});

		it("should work as the example", () => {
			const result = template`class ${new Pascal("user")}Repository {}`();
			expect(result).toStrictEqual("class UserRepository {}");
		});

		describe("compose", () => {
			it("should compose the result with a function", () => {
				const result = template`${new Pascal("user")}Repository`.compose(
					(input) => `${input}Test`,
				)();
				expect(result).toStrictEqual("UserRepositoryTest");
			});

			it("should return the composed value when calling thenRender", () => {
				const result = template`${new Pascal("user")}Repository`
					.compose((input) => `${input}Test`)
					.thenRender();
				expect(result).toStrictEqual("UserRepositoryTest");
			});
		});
	});
});
