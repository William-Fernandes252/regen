export abstract class Case {
	constructor(private raw: Template.Value) {}

	protected getValue(): string {
		return String(this.raw ?? "");
	}

	/**
	 * Convert the value to a formatted string.
	 */
	abstract toString(): string;

	[Symbol.toPrimitive](_: string): string {
		return this.toString();
	}
}

export class Upper extends Case {
	toString(): string {
		return this.getValue().toUpperCase();
	}
}

export class Lower extends Case {
	toString(): string {
		return this.getValue().toLowerCase();
	}
}

export class Camel extends Case {
	toString(): string {
		return this.getValue()
			.toLowerCase()
			.split(/[^a-zA-Z0-9]+/)
			.map((word, index) => {
				if (index === 0) {
					return word;
				}
				return word.charAt(0).toUpperCase() + word.slice(1);
			})
			.join("");
	}
}

export class Pascal extends Case {
	toString(): string {
		return this.getValue()
			.toLowerCase()
			.split(/[^a-zA-Z0-9]+/)
			.map((word) => {
				return word.charAt(0).toUpperCase() + word.slice(1);
			})
			.join("");
	}
}

export class Kebab extends Case {
	toString(): string {
		return this.getValue()
			.toLowerCase()
			.split(/[^a-zA-Z0-9]+/)
			.filter((word) => word.length > 0)
			.join("-");
	}
}

export class Snake extends Case {
	toString(): string {
		return this.getValue()
			.toLowerCase()
			.split(/[^a-zA-Z0-9]+/)
			.filter((word) => word.length > 0)
			.join("_");
	}
}
