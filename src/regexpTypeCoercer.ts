import {TypeCoercer} from './literalParser';

const createRegexpTypeCoercer = (name: string, regexp: RegExp): TypeCoercer<string> => {
	return (value: unknown): string => {
		if (typeof value !== 'string') {
			throw new TypeError(`${name} cannot represent a non string value: [${String(value)}]`);
		}
		if (!regexp.test(value)) {
			throw new TypeError(`${name} cannot represent a string value: [${String(value)}]`);
		}

		return value;
	};
};

export {
	createRegexpTypeCoercer,
};
