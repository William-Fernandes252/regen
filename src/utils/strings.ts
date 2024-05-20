/**
 * Return the text with the first letter in upper case.
 * @param text The text to capitalize
 * @returns The text with the first letter in upper case
 */
export function capitalize(text: string) {
	return text.charAt(0).toUpperCase() + text.slice(1);
}

/**
 * Return the text with the first letter in lower case.
 * @param text The text to uncapitalize
 * @returns The text with the first letter in lower case
 */
export function uncapitalize(text: string) {
	return text.charAt(0).toLowerCase() + text.slice(1);
}
