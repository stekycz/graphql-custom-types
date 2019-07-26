import {graphql} from 'graphql';
import {schema} from '../schema';

describe('GraphQLIPv4', () => {
	const invalid = [
		'',
		'asdfg',
		'0.0.0.256',
		'0.0.0',
		'0.0.0.',
		'0.0.0.0.',
		'0.0.0.0.0',
	];

	const valid = [
		'127.0.0.1',
		'255.255.255.255',
		'0.0.0.0',
		'192.168.0.1',
	];

	invalid.forEach((ipv4) => {
		it(`fails for "${ipv4}"`, async () => {
			const query = `{ipv4(item: "${ipv4}")}`;
			const result = await graphql(schema, query);
			expect(result).not.toHaveProperty('data.ipv4');
			expect(result).toHaveProperty('errors.0.message', expect.stringMatching('Expected type IPv4, found "[^"]*".'));
		});
	});

	valid.forEach((ipv4) => {
		it(`succeeds for "${ipv4}"`, async () => {
			const query = `{ipv4(item: "${ipv4}")}`;
			const result = await graphql(schema, query);
			expect(result).toHaveProperty('data.ipv4', ipv4);
			expect(result).not.toHaveProperty('errors');
		});
	});

	it('succeeds for NULL', async () => {
		const query = '{ipv4(item: null)}';
		const result = await graphql(schema, query);
		expect(result).toHaveProperty('data.ipv4', null);
		expect(result).not.toHaveProperty('errors');
	});
});
