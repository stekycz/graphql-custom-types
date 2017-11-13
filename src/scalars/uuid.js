// @flow

import * as factory from '../factory';

const GraphQLUUID = factory.createRegexScalar(
  'UUID',
  'The UUID scalar type represents a UUID.',
  // @see https://github.com/chriso/validator.js/blob/master/src/lib/isUUID.js#L7
  /^[0-9A-F]{8}-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{12}$/i
);

export {
  GraphQLUUID,
};
