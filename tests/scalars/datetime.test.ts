import {DateTime, Settings} from 'luxon';
import {graphql} from 'graphql';
import {schema} from '../schema';

Settings.defaultZoneName = 'utc';

describe('GraphQLDateTime', () => {
	const invalid = [
		'',
		'2015-13-1',
		'2015-01-01T23:61:59',
		'2015-05-31T14:63:30',
		'123456',
		'2015-1',
		'2015-1-1',
		'2015-5-31',
	];

	const valid = [
		'2015',
		'9999',
		'2015-01-01',
		'2015-05-31',
		'2015-05-31T14:23',
		'2015-05-31T14:23:30',
		'2015-05-31T14:23:30.1234',
		'2015-05-31T14:23Z',
		'2015-05-31T14:23:30.1234Z',
		'2015-05-31T14:23:30.1234+05:00',
		'1970-01-01T00:00:00.000Z',
		'1969-12-31T23:59:59.999Z',
	];

	invalid.forEach((datetime) => {
		it(`fails for "${datetime}"`, async () => {
			const expectedResult = DateTime.fromISO(datetime);
			expect(expectedResult.isValid).toBeFalsy();

			const query = `{date(item: "${datetime}")}`;
			const result = await graphql(schema, query);
			expect(result).not.toHaveProperty('data.date');
			expect(result).toHaveProperty('errors.0.message', expect.stringMatching('Expected type DateTime, found "[^"]*".'));
		});
	});

	valid.forEach((datetime) => {
		it(`succeeds for "${datetime}"`, async () => {
			const expectedResult = DateTime.fromISO(datetime);
			expect(expectedResult.isValid).toBeTruthy();

			const query = `{date(item: "${datetime}")}`;
			const result = await graphql(schema, query);
			expect(result).toHaveProperty('data.date', expectedResult.toISO());
			expect(result).not.toHaveProperty('errors');
		});
	});
});
