import * as factory from '../factory';

const GraphQLDateTime = factory.createStringScalar(
	'DateTime',
	'The DateTime scalar type represents date time strings complying to ISO-8601.',
	(value: unknown): string => {
		if (typeof value !== 'string') {
			throw new TypeError(`DateTime cannot represent a non string value: [${String(value)}]`);
		}
		if (isNaN(Date.parse(value))) {
			throw new TypeError('DateTime cannot represent an invalid date time string');
		}

		return value;
	}
);

export {
	GraphQLDateTime,
};
