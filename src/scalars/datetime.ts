import {DateTime} from 'luxon';
import {GraphQLScalarType} from 'graphql';
import {createParseLiteral} from '../literalParser';

const coerceType = (value: unknown): DateTime => {
	if (typeof value !== 'string') {
		throw new TypeError(`DateTime cannot represent a non string value: [${String(value)}]`);
	}

	const datetime = DateTime.fromISO(value);
	if (!datetime.isValid && datetime.invalidExplanation != null) {
		throw new TypeError(datetime.invalidExplanation);
	}

	return datetime;
};

const GraphQLDateTime = new GraphQLScalarType({
	name: 'DateTime',
	description: 'The DateTime scalar type represents date time strings complying to ISO-8601.',
	serialize: (value: unknown): string => {
		if (!DateTime.isDateTime(value)) {
			throw new TypeError(`DateTime cannot represent a non DateTime value: [${String(typeof value)}] given`);
		}

		return value.toISO();
	},
	parseValue: coerceType,
	parseLiteral: createParseLiteral(coerceType),
});

export {
	GraphQLDateTime,
};
