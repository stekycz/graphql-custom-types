# GraphQL Extra scalars
[![npm version](https://badge.fury.io/js/graphql-extra-scalars.svg)](https://badge.fury.io/js/graphql-extra-scalars) [![Build Status](https://secure.travis-ci.org/stekycz/graphql-extra-scalars.svg?branch=master)](https://travis-ci.org/stekycz/graphql-extra-scalars) [![Dependency Status](https://david-dm.org/stekycz/graphql-extra-scalars.svg)](https://david-dm.org/stekycz/graphql-extra-scalars) [![devDependencies Status](https://david-dm.org/stekycz/graphql-extra-scalars/dev-status.svg)](https://david-dm.org/stekycz/graphql-extra-scalars?type=dev) [![peerDependencies Status](https://david-dm.org/stekycz/graphql-extra-scalars/peer-status.svg)](https://david-dm.org/stekycz/graphql-extra-scalars?type=peer)

> This is a collection of extra GraphQL scalar types.

## Available Types

Let me give you an overview of the available types. If you need more detail about how to use them, check `tests/schema.js`.

The primitive types, aka everything that may be represented as a string. The ones with parameters you need to instantiate with *new* and pass according parameters, the others may be used as are.

* `GraphQLEmail`
* `GraphQLURL`
* `GraphQLDateTime`
* `GraphQLLimitedString(min, max, alphabet)`
* `GraphQLPassword(min, max, alphabet, complexity)`
* `GraphQLUUID`

`complexity` options:

```javascript
{
  alphaNumeric: false,
  mixedCase: false,
  specialChars: false
}
```

## Installation

Most likely you already will have it, but do not forget to also install **graphql**, since it is required as peer dependency:

```sh
npm install graphql graphql-extra-scalars --save
```

or

```sh
yarn add graphql graphql-extra-scalars
```

## Usage

```javascript
import {
  GraphQLEmail,
  GraphQLURL,
  GraphQLDateTime,
  GraphQLLimitedString,
  GraphQLPassword,
  GraphQLUUID
} from 'graphql-extra-scalars';
```

And use it in your `GraphQLSchema` as you would use any other type.

## Development

Contributions are very welcome, please feel free to submit a type. If you do so make sure there are test cases in place.

### Testing

The test suite may be invoked by running:

```sh
npm test
```
