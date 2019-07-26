import {graphql} from 'graphql';
import {schema} from '../schema';

describe('GraphQLLimitedString', () => {
	describe('default', () => {
		const invalid = [
			'',
		];

		const valid = [
			'a',
			'aa',
			'aaa1',
			'1aaa',
		];

		invalid.forEach((string) => {
			it(`fails for "${string}"`, async () => {
				const query = `{limitedStringDefault(item: "${string}")}`;
				const result = await graphql(schema, query);
				expect(result).not.toHaveProperty('data.limitedStringDefault');
				expect(result).toHaveProperty('errors.0.message', expect.stringMatching('Expected type LimitedString, found "[^"]*".'));
			});
		});

		valid.forEach((string) => {
			it(`succeeds for "${string}"`, async () => {
				const query = `{limitedStringDefault(item: "${string}")}`;
				const result = await graphql(schema, query);
				expect(result).toHaveProperty('data.limitedStringDefault', string);
				expect(result).not.toHaveProperty('errors');
			});
		});

		it('succeeds for NULL', async () => {
			const query = '{limitedStringDefault(item: null)}';
			const result = await graphql(schema, query);
			expect(result).toHaveProperty('data.limitedStringDefault', null);
			expect(result).not.toHaveProperty('errors');
		});
	});

	describe('min = 3, max = 10', () => {
		const invalid = [
			'',
			'a',
			'aa',
			'01234567890',
			'foobar23456',
		];

		const valid = [
			'foo',
			'foobar',
			'foo-bar',
			'foobar23',
			'123456789',
		];

		invalid.forEach((string) => {
			it(`fails for "${string}"`, async () => {
				const query = `{limitedStringMinMax(item: "${string}")}`;
				const result = await graphql(schema, query);
				expect(result).not.toHaveProperty('data.limitedStringMinMax');
				expect(result).toHaveProperty('errors.0.message', expect.stringMatching('Expected type LimitedString2, found "[^"]*".'));
			});
		});

		valid.forEach((string) => {
			it(`succeeds for "${string}"`, async () => {
				const query = `{limitedStringMinMax(item: "${string}")}`;
				const result = await graphql(schema, query);
				expect(result).toHaveProperty('data.limitedStringMinMax', string);
				expect(result).not.toHaveProperty('errors');
			});
		});

		it('succeeds for NULL', async () => {
			const query = '{limitedStringMinMax(item: null)}';
			const result = await graphql(schema, query);
			expect(result).toHaveProperty('data.limitedStringMinMax', null);
			expect(result).not.toHaveProperty('errors');
		});
	});

	describe('min = 3, max = 10, alphabet = "abc123"', () => {
		const invalid = [
			'',
			'a',
			'aa',
			'dddd',
			'abd1234',
			'01234567890',
			'foobar23456',
		];

		const valid = [
			'aaa',
			'abc',
			'abc123',
			'1231231231',
			'aaaaabbbbb',
			'33333ccc22',
		];

		invalid.forEach((string) => {
			it(`fails for "${string}"`, async () => {
				const query = `{limitedStringAlphabet(item: "${string}")}`;
				const result = await graphql(schema, query);
				expect(result).not.toHaveProperty('data.limitedStringAlphabet');
				expect(result).toHaveProperty('errors.0.message', expect.stringMatching('Expected type LimitedString3, found "[^"]*".'));
			});
		});

		valid.forEach((string) => {
			it(`succeeds for "${string}"`, async () => {
				const query = `{limitedStringAlphabet(item: "${string}")}`;
				const result = await graphql(schema, query);
				expect(result).toHaveProperty('data.limitedStringAlphabet', string);
				expect(result).not.toHaveProperty('errors');
			});
		});

		it('succeeds for NULL', async () => {
			const query = '{limitedStringAlphabet(item: null)}';
			const result = await graphql(schema, query);
			expect(result).toHaveProperty('data.limitedStringAlphabet', null);
			expect(result).not.toHaveProperty('errors');
		});
	});
});
