import {GraphQLScalarType} from 'graphql';
import {createParseLiteral} from './literalParser';
import {createRegexpTypeCoercer} from './regexpTypeCoercer';

const createRegexScalar = (name: string, description: string, regexp: RegExp): GraphQLScalarType => {
	const coerceType = createRegexpTypeCoercer(name, regexp);

	return new GraphQLScalarType({
		name: name,
		description: description,
		serialize: coerceType,
		parseValue: coerceType,
		parseLiteral: createParseLiteral(coerceType),
	});
};

export {
	createRegexScalar,
};
