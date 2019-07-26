import {graphql} from 'graphql';
import {schema} from '../schema';

describe('GraphQLPassword', () => {
	describe('alphaNumeric', () => {
		const invalid = [
			'',
			'a',
			'aa',
			'dddd',
			'aaaaabbbbb',
			'1',
			'1234',
			'1234567890',
		];

		const valid = [
			'a1',
			'a1c',
			'abc123',
			'123abc1231',
			'33333ccc22',
			'33333ccc22C',
			'333§ccc22',
		];

		invalid.forEach((password) => {
			it(`fails for "${password}"`, async () => {
				const query = `{password(item: "${password}")}`;
				const result = await graphql(schema, query);
				expect(result).not.toHaveProperty('data.password');
				expect(result).toHaveProperty('errors.0.message', expect.stringMatching('Expected type Password, found "[^"]*".'));
			});
		});

		valid.forEach((password) => {
			it(`succeeds for "${password}"`, async () => {
				const query = `{password(item: "${password}")}`;
				const result = await graphql(schema, query);
				expect(result).toHaveProperty('data.password', password);
				expect(result).not.toHaveProperty('errors');
			});
		});

		it('succeeds for NULL', async () => {
			const query = '{password(item: null)}';
			const result = await graphql(schema, query);
			expect(result).toHaveProperty('data.password', null);
			expect(result).not.toHaveProperty('errors');
		});
	});

	describe('mixedCase', () => {
		const invalid = [
			'',
			'a',
			'aa',
			'dddd',
			'aaaaabbbbb',
			'1',
			'1234',
			'1234567890',
			'1a',
			'123aaaa',
			'foo23bar',
		];

		const valid = [
			'aA',
			'a1C',
			'aBc123',
			'123Abc1231',
			'33333cCc22',
			'33333ccc22C',
			'333§ccC22',
		];

		invalid.forEach((password) => {
			it(`fails for "${password}"`, async () => {
				const query = `{passwordMixedCase(item: "${password}")}`;
				const result = await graphql(schema, query);
				expect(result).not.toHaveProperty('data.passwordMixedCase');
				expect(result).toHaveProperty('errors.0.message', expect.stringMatching('Expected type Password2, found "[^"]*".'));
			});
		});

		valid.forEach((password) => {
			it(`succeeds for "${password}"`, async () => {
				const query = `{passwordMixedCase(item: "${password}")}`;
				const result = await graphql(schema, query);
				expect(result).toHaveProperty('data.passwordMixedCase', password);
				expect(result).not.toHaveProperty('errors');
			});
		});

		it('succeeds for NULL', async () => {
			const query = '{passwordMixedCase(item: null)}';
			const result = await graphql(schema, query);
			expect(result).toHaveProperty('data.passwordMixedCase', null);
			expect(result).not.toHaveProperty('errors');
		});
	});

	describe('specialChars', () => {
		const invalid = [
			'',
			'a',
			'aa',
			'dddd',
			'aaaaabbbbb',
			'1',
			'1234',
			'1234567890',
			'1a',
			'123aaaa',
			'foo23bar',
		];

		const valid = [
			'aÄ',
			'a1*',
			'a(c123',
			'1%3Abc1231',
			'33333#Cc22',
			'!1',
			'!#!§$%&/()',
		];

		invalid.forEach((password) => {
			it(`fails for "${password}"`, async () => {
				const query = `{passwordSpecialChars(item: "${password}")}`;
				const result = await graphql(schema, query);
				expect(result).not.toHaveProperty('data.passwordSpecialChars');
				expect(result).toHaveProperty('errors.0.message', expect.stringMatching('Expected type Password3, found "[^"]*".'));
			});
		});

		valid.forEach((password) => {
			it(`succeeds for "${password}"`, async () => {
				const query = `{passwordSpecialChars(item: "${password}")}`;
				const result = await graphql(schema, query);
				expect(result).toHaveProperty('data.passwordSpecialChars', password);
				expect(result).not.toHaveProperty('errors');
			});
		});

		it('succeeds for NULL', async () => {
			const query = '{passwordSpecialChars(item: null)}';
			const result = await graphql(schema, query);
			expect(result).toHaveProperty('data.passwordSpecialChars', null);
			expect(result).not.toHaveProperty('errors');
		});
	});

	describe('all', () => {
		const invalid = [
			'',
			'a',
			'aa',
			'dddd',
			'aaaaabbbbb',
			'1',
			'1234',
			'1234567890',
			'1a',
			'123aaaa',
			'foo23bar',
			'aÄ',
			'a1*',
			'a(c123',
			'1%3Abc1231',
			'33333#Cc22',
			'!1',
		];

		const valid = [
			'a1!B',
			'b2§A3!',
			'!!A1b',
		];

		invalid.forEach((password) => {
			it(`fails for "${password}"`, async () => {
				const query = `{passwordAll(item: "${password}")}`;
				const result = await graphql(schema, query);
				expect(result).not.toHaveProperty('data.passwordAll');
				expect(result).toHaveProperty('errors.0.message', expect.stringMatching('Expected type Password4, found "[^"]*".'));
			});
		});

		valid.forEach((password) => {
			it(`succeeds for "${password}"`, async () => {
				const query = `{passwordAll(item: "${password}")}`;
				const result = await graphql(schema, query);
				expect(result).toHaveProperty('data.passwordAll', password);
				expect(result).not.toHaveProperty('errors');
			});
		});

		it('succeeds for NULL', async () => {
			const query = '{passwordAll(item: null)}';
			const result = await graphql(schema, query);
			expect(result).toHaveProperty('data.passwordAll', null);
			expect(result).not.toHaveProperty('errors');
		});
	});
});
