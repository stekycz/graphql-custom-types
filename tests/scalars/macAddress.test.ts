import {graphql} from 'graphql';
import {schema} from '../schema';

describe('GraphQLMacAddress', () => {
	const invalid = [
		'',
		'asdfg',
		'00:00:00:00:00:0',
		'00:00:00:00:00:0g',
		'00:00:00:00:00:00:',
		'00:00:00:00:00:00:00',
	];

	const valid = [
		'00:00:00:00:00:00',
		'00:55:99:aa:cc:ff',
		'FF:FF:FF:FF:FF:FF',
	];

	invalid.forEach((macAddress) => {
		it(`fails for "${macAddress}"`, async () => {
			const query = `{macAddress(item: "${macAddress}")}`;
			const result = await graphql(schema, query);
			expect(result).not.toHaveProperty('data.macAddress');
			expect(result).toHaveProperty('errors.0.message', expect.stringMatching('Expected type MacAddress, found "[^"]*".'));
		});
	});

	valid.forEach((macAddress) => {
		it(`succeeds for "${macAddress}"`, async () => {
			const query = `{macAddress(item: "${macAddress}")}`;
			const result = await graphql(schema, query);
			expect(result).toHaveProperty('data.macAddress', macAddress.toUpperCase());
			expect(result).not.toHaveProperty('errors');
		});
	});
});
