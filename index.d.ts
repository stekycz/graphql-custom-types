// tslint:disable max-classes-per-file
import {GraphQLScalarType} from "graphql";

declare namespace graphqlExtraScalars {

  const GraphQLEmail: GraphQLScalarType;

  const GraphQLURL: GraphQLScalarType;

  const GraphQLDateTime: GraphQLScalarType;

  const GraphQLUUID: GraphQLScalarType;

  class GraphQLPassword extends GraphQLScalarType {
    constructor(min?: number, max?: number, alphabet?: string, complexity?: {
      alphaNumeric?: boolean,
      mixedCase?: boolean,
      specialChars?: boolean,
    });
  }

  class GraphQLLimitedString extends GraphQLScalarType {
    constructor(min?: number, max?: number, alphabet?: string)
  }
}

export = graphqlExtraScalars;
