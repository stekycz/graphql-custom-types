import {GraphQLScalarType} from 'graphql';
import {createParseLiteral} from '../literalParser';
import {createRegexpTypeCoercer} from '../regexpTypeCoercer';

const coerceType = createRegexpTypeCoercer('MacAddress', /^(?:[0-9A-F]{2}:){5}[0-9A-F]{2}$/ui);

const GraphQLMacAddress = new GraphQLScalarType({
	name: 'MacAddress',
	description: 'The MacAddress scalar type represents a MAC address.',
	serialize: (value: unknown): string => {
		const coercedValue = coerceType(value);

		return coercedValue.toUpperCase();
	},
	parseValue: coerceType,
	parseLiteral: createParseLiteral(coerceType),
});

export {
	GraphQLMacAddress,
};
