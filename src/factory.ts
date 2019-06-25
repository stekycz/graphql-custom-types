import {GraphQLScalarType} from 'graphql';
import {createParseLiteral} from './literalParser';

type TypeCoercer = (value: unknown) => string | void;

const createStringScalar = (name: string, description: string, coerceType: TypeCoercer): GraphQLScalarType => {
	return new GraphQLScalarType({
		name: name,
		description: description,
		serialize: coerceType,
		parseValue: coerceType,
		parseLiteral: createParseLiteral(coerceType),
	});
};

const createRegexScalar = (name: string, description: string, regexp: RegExp): GraphQLScalarType => {
	const coerceType = (value: unknown): string | void => {
		if (typeof value !== 'string') {
			throw new TypeError(`${name} cannot represent a non string value: [${String(value)}]`);
		}
		if (!regexp.test(value)) {
			throw new TypeError(`${name} cannot represent a string value: [${String(value)}]`);
		}

		return value;
	};

	return createStringScalar(name, description, coerceType);
};

export {
	createStringScalar,
	createRegexScalar,
};
