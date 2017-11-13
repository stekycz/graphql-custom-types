// @flow

import * as factory from '../factory';

const GraphQLEmail = factory.createRegexScalar(
  'Email',
  'The Email scalar type represents E-Mail addresses compliant to RFC 822.',
  /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
);

export {
  GraphQLEmail,
};
