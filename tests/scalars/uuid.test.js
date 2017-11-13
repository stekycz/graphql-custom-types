import {graphql} from 'graphql';
import {schema} from '../schema';
import using from 'jasmine-data-provider';

describe('GraphQLUUID', () => {
  const invalid = [
    '',
    'xxxA987FBC9-4BED-3078-CF07-9141BA07C9F3',
    'A987FBC9-4BED-3078-CF07-9141BA07C9F3xxx',
    'A987FBC94BED3078CF079141BA07C9F3',
    '934859',
    '987FBC9-4BED-3078-CF07A-9141BA07C9F3',
    'AAAAAAAA-1111-1111-AAAG-111111111111',
  ];

  const valid = [
    'bfaa2768-ba8c-11e5-9912-ba0be0483c18',
    'E8D6F4C2-BA8C-11E5-9912-BA0BE0483C18',
    'bd2e3ee3-8908-4665-9b59-682587236654',
    'df7c8034-41e3-409a-a441-2e08ba65b827',
    '5a028adb-c082-4980-aab3-f3c16642281a',
    '6715da1d-212b-4aab-9b9e-117e3a10de19',
    '209a03b9-2d18-4ea1-ab11-c3d46e7f1725',
    'f1b2eddc-4d38-42b1-8232-137934b6821d',
    '874ed1b5-51e6-470f-8b29-b21ade28cb81',
    '13627f16-6b28-4a91-bdc0-15bd9387b9ed',
    '738442a4-00e6-43b6-b6d5-f9a8e8aa3528',
    'b27fbc79-1314-472c-b509-2feb9d0050f7',
    '6ea45d93-9d50-4668-9ccb-07ab78b14458',
    'f97f6df2-f94b-47a1-a2db-ea2802ef79d9',
    '019fad9a-fbae-4dd6-aba2-3d76bdcaed59',
  ];

  using(invalid, (uuid) => {
    it(`fails for "${uuid}"`, async () => {
      const query = `{uuid(item: "${uuid}")}`;
      const result = await graphql(schema, query);
      expect(result).not.toHaveProperty('data.uuid');
      expect(result).toHaveProperty('errors.0.message', expect.stringMatching('Expected type "UUID"'));
    });
  });

  using(valid, (uuid) => {
    it(`succeeds for "${uuid}"`, async () => {
      const query = `{uuid(item: "${uuid}")}`;
      const result = await graphql(schema, query);
      expect(result).toHaveProperty('data.uuid', uuid);
      expect(result).not.toHaveProperty('errors');
    });
  });
});
