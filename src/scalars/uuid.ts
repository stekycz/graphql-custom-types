import {GraphQLScalarType} from 'graphql';
import {createParseLiteral} from '../literalParser';
import {createRegexpTypeCoercer} from '../regexpTypeCoercer';

const coerceType = createRegexpTypeCoercer('UUID', /^[0-9A-F]{8}-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{12}$/ui);

const GraphQLUUID = new GraphQLScalarType({
	name: 'UUID',
	description: 'The UUID scalar type represents a UUID.',
	serialize: (value: unknown): string => {
		const coercedValue = coerceType(value);

		return coercedValue.toLowerCase();
	},
	parseValue: coerceType,
	parseLiteral: createParseLiteral(coerceType),
});

export {
	GraphQLUUID,
};
