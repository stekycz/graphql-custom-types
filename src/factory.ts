import {GraphQLScalarType} from 'graphql';
import {TypeCoercer, createParseLiteral} from './literalParser';

const createStringScalar = (name: string, description: string, coerceType: TypeCoercer<string>): GraphQLScalarType => {
	return new GraphQLScalarType({
		name: name,
		description: description,
		serialize: coerceType,
		parseValue: coerceType,
		parseLiteral: createParseLiteral(coerceType),
	});
};

const createRegexScalar = (name: string, description: string, regexp: RegExp): GraphQLScalarType => {
	const coerceType = (value: unknown): string => {
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
