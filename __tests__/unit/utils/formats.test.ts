import { Camel, Kebab, Lower, Pascal, Snake, Upper } from "@/utils/formats";

describe("formats", () => {
	const cases = [
		{
			Class: Upper,
			input: "hello world",
			expected: "HELLO WORLD",
		},
		{
			Class: Lower,
			input: "HELLO WORLD",
			expected: "hello world",
		},
		{
			Class: Camel,
			input: "hello world",
			expected: "helloWorld",
		},
		{
			Class: Pascal,
			input: "hello world",
			expected: "HelloWorld",
		},
		{
			Class: Kebab,
			input: "hello world",
			expected: "hello-world",
		},
		{
			Class: Snake,
			input: "hello world",
			expected: "hello_world",
		},
	];

	it.each(cases)(
		"$Class.name should format '$input' correctly",
		({ Class, input, expected }) => {
			const instance = new Class(input);
			expect(instance.toString()).toBe(expected);
		},
	);

	it("should support symbol-toPrimitive for string coercion", () => {
		const instance = new Pascal("hello world");
		expect(`${instance}`).toBe("HelloWorld");
	});

	it("should handle multiple delimiters", () => {
		const snake = new Snake("this--is__a test");
		const kebab = new Kebab("this--is__a test");
		const camel = new Camel("this--is__a test");

		expect(snake.toString()).toBe("this_is_a_test");
		expect(kebab.toString()).toBe("this-is-a-test");
		expect(camel.toString()).toBe("thisIsATest");
	});

	it("should return empty string for undefined or null values", () => {
		expect(new Upper(undefined).toString()).toBe("");
		expect(new Kebab(null).toString()).toBe("");
	});
});
