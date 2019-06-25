const lengthValidator = (name: string, value: string, min: number, max?: number): void => {
	if (value.length < min) {
		throw new TypeError(`${name} not long enough`);
	}

	if (max && value.length > max) {
		throw new TypeError(`${name} too long`);
	}
};

const alphabetValidator = (name: string, value: string, alphabet: string | string[]): void => {
	for (const char of value) {
		if (!alphabet.includes(char)) {
			throw new TypeError(`${name} has a not allowed character`);
		}
	}
};

export interface ComplexityOptions {
	alphaNumeric?: boolean;
	mixedCase?: boolean;
	specialChars?: boolean;
}

const complexityValidator = (name: string, value: string, options: ComplexityOptions = {}): void => {
	const alphaNumericRe = /^(?=.*[0-9])(?=.*[a-zA-Z])(.+)$/u;
	const mixedCaseRe = /^(?=.*[a-z])(?=.*[A-Z])(.+)$/u;
	const specialCharsRe = /^(?=.*[^a-zA-Z0-9])(.+)$/u;

	if (options.alphaNumeric && !alphaNumericRe.test(value)) {
		throw new TypeError(`${name} must contain at least one number and one letter`);
	}

	if (options.mixedCase && !mixedCaseRe.test(value)) {
		throw new TypeError(`${name} must contain at least one upper and one lower case letter`);
	}

	if (options.specialChars && !specialCharsRe.test(value)) {
		throw new TypeError(`${name} must contain at least one special character`);
	}
};

export {
	alphabetValidator,
	complexityValidator,
	lengthValidator,
};
