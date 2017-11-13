// @flow

import type {ValueNode} from 'graphql/language';
import {Kind} from 'graphql/language';

const createParseLiteral = (coerceType: (value: mixed) => ?string): * => {
  return (ast: ValueNode): ?string => {
    if (ast.kind === Kind.STRING) {
      try {
        return coerceType(ast.value);
      } catch (error) {
        if (error instanceof TypeError) {
          return undefined;
        }

        throw error;
      }
    }
  };
};

export {
  createParseLiteral,
};
