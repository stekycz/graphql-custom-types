import {graphql} from 'graphql';
import {schema} from '../schema';

describe('GraphQLURL', () => {
	const invalid = [
		'',
		'http://',
		'http://.',
		'http://..',
		'http://../',
		'http://?',
		'http://??',
		'http://??/',
		'http://#',
		'http://##',
		'http://##/',
		'http://foo.bar?q=Spaces should be encoded',
		'//',
		'//a',
		'///a',
		'///',
		'http:///a',
		'foo.com',
		'rdar://1234',
		'h://test',
		'http:// shouldfail.com',
		':// should fail',
		'http://foo.bar/foo(bar)baz quux',
		'ftps://foo.bar/',
		'http://-error-.invalid/',
		'http://-a.b.co',
		'http://a.b-.co',
		'http://0.0.0.0',
		'http://10.1.1.0',
		'http://10.1.1.255',
		'http://224.1.1.1',
		'http://1.1.1.1.1',
		'http://123.123.123',
		'http://3628126748',
		'http://.www.foo.bar/',
		'http://.www.foo.bar./',
		'http://10.1.1.1',
	];

	const valid = [
		'http://foo.com/blah_blah',
		'http://foo.com/blah_blah/',
		'http://foo.com/blah_blah_(wikipedia)',
		'http://foo.com/blah_blah_(wikipedia)_(again)',
		'http://www.example.com/wpstyle/?p=364',
		'https://www.example.com/foo/?bar=baz&inga=42&quux',
		'http://✪df.ws/123',
		'http://userid:password@example.com:8080',
		'http://userid:password@example.com:8080/',
		'http://userid@example.com',
		'http://userid@example.com/',
		'http://userid@example.com:8080',
		'http://userid@example.com:8080/',
		'http://userid:password@example.com',
		'http://userid:password@example.com/',
		'http://142.42.1.1/',
		'http://142.42.1.1:8080/',
		'http://➡.ws/䨹',
		'http://⌘.ws',
		'http://⌘.ws/',
		'http://foo.com/blah_(wikipedia)#cite-1',
		'http://foo.com/blah_(wikipedia)_blah#cite-1',
		'http://foo.com/unicode_(✪)_in_parens',
		'http://foo.com/(something)?after=parens',
		'http://☺.damowmow.com/',
		'http://code.google.com/events/#&product=browser',
		'http://j.mp',
		'ftp://foo.bar/baz',
		'http://foo.bar/?q=Test%20URL-encoded%20stuff',
		'http://مثال.إختبار',
		'http://例子.测试',
		'http://उदाहरण.परीक्षा',
		'http://-.~_!$&\'()*+,;=:%40:80%2f::::::@example.com',
		'http://1337.net',
		'http://a.b-c.de',
		'http://223.255.255.254',
	];

	invalid.forEach((url) => {
		it(`fails for "${url}"`, async () => {
			const query = `{url(item: "${url}")}`;
			const result = await graphql(schema, query);
			expect(result).not.toHaveProperty('data.url');
			expect(result).toHaveProperty('errors.0.message', expect.stringMatching('Expected type URL, found "[^"]*".'));
		});
	});

	valid.forEach((url) => {
		it(`succeeds for "${url}"`, async () => {
			const query = `{url(item: "${url}")}`;
			const result = await graphql(schema, query);
			expect(result).toHaveProperty('data.url', url);
			expect(result).not.toHaveProperty('errors');
		});
	});

	it('succeeds for NULL', async () => {
		const query = '{url(item: null)}';
		const result = await graphql(schema, query);
		expect(result).toHaveProperty('data.url', null);
		expect(result).not.toHaveProperty('errors');
	});
});
