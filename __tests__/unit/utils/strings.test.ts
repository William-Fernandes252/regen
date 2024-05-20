import { capitalize, uncapitalize } from "@/utils/strings";

describe("strings", () => {
	describe("capitalize", () => {
		it("should return a string with the first letter in upper case", () => {
			const text = "hello";
			const expected = "Hello";
			const result = capitalize(text);
			expect(result).toStrictEqual(expected);
		});
		it("should return empty string if input is empty", () => {
			const text = "";
			const expected = "";
			const result = capitalize(text);
			expect(result).toStrictEqual(expected);
		});
	});
	describe("uncapitalize", () => {
		it("should return a string with the first letter in lower case", () => {
			const text = "Hello";
			const expected = "hello";
			const result = uncapitalize(text);
			expect(result).toStrictEqual(expected);
		});
		it("should return empty string if input is empty", () => {
			const text = "";
			const expected = "";
			const result = uncapitalize(text);
			expect(result).toStrictEqual(expected);
		});
	});
});
