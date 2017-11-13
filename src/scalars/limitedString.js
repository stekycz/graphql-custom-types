// @flow

import * as validators from '../validators';
import {GraphQLScalarType} from 'graphql';
import {Kind} from 'graphql/language';
import {createParseLiteral} from '../literalParser';

let limitedStringCounter = 0;

class GraphQLLimitedString extends GraphQLScalarType {
  constructor(min: number = 1, max?: number, alphabet?: string) {
    const suffix = (limitedStringCounter++ > 0) ? limitedStringCounter : '';
    const name = 'LimitedString' + suffix;
    let description = 'A limited string.';
    if (max) {
      description += ' Has to be between ' + min + ' and ' + max + ' characters long.';
    } else {
      description += ' Has to be at least ' + min + ' characters long.';
    }
    if (alphabet) {
      description += ' May only contain the following characters: ' + alphabet;
    }

    const coerceType = (value: mixed): ?string => {
      if (typeof value !== 'string') {
        throw new TypeError(`${name} cannot represent a non string value: [${String(value)}]`);
      }
      validators.lengthValidator(name, value, min, max);

      if (alphabet) {
        validators.alphabetValidator(name, value, alphabet);
      }

      return value;
    };

    super({
      name: name,
      description: description,
      serialize: coerceType,
      parseValue: coerceType,
      parseLiteral: createParseLiteral(coerceType),
    });
  }
}

export {
  GraphQLLimitedString,
};
