import * as factory from '../factory';

const GraphQLIPv4 = factory.createRegexScalar(
	'IPv4',
	'The IPv4 scalar type represents a IPv4.',
	/^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/u
);

export {
	GraphQLIPv4,
};
