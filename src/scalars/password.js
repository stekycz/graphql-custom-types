// @flow

import * as validators from '../validators';
import {GraphQLScalarType} from 'graphql';
import {Kind} from 'graphql/language';
import type {ComplexityOptions} from '../validators';
import {createParseLiteral} from '../literalParser';

let passwordCounter = 0;

class GraphQLPassword extends GraphQLScalarType {
  constructor(min: number = 1, max?: number, alphabet?: string, complexity?: ComplexityOptions) {
    const suffix = (passwordCounter++ > 0) ? passwordCounter : '';
    const name = 'Password' + suffix;
    let description = 'A password string.';
    if (max) {
      description += ' Has to be between ' + min + ' and ' + max + ' characters long.';
    } else {
      description += ' Has to be at least ' + min + ' characters long.';
    }
    if (alphabet) {
      description += ' May only contain the following characters: ' + alphabet;
    }
    if (complexity) {
      if (complexity.alphaNumeric) {
        description += ' Has to be alpha numeric.';
      }
      if (complexity.mixedCase) {
        description += ' Has to be mixed case.';
      }
      if (complexity.specialChars) {
        description += ' Has to contain special characters.';
      }
    }

    const coerceType = (value: mixed): ?string => {
      if (typeof value !== 'string') {
        throw new TypeError(`${name} cannot represent a non string value: [${String(value)}]`);
      }
      validators.lengthValidator(name, value, min, max);

      if (alphabet) {
        validators.alphabetValidator(name, value, alphabet);
      }
      if (complexity) {
        validators.complexityValidator(name, value, complexity);
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
  GraphQLPassword,
};
