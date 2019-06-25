import {DateTime} from 'luxon';
import {
	GraphQLDateTime,
	GraphQLEmail,
	GraphQLIPv4,
	GraphQLLimitedString,
	GraphQLPassword,
	GraphQLURL,
	GraphQLUUID,
} from '../src';
import {GraphQLObjectType, GraphQLSchema, GraphQLString} from 'graphql';

const schema = new GraphQLSchema({
	query: new GraphQLObjectType({
		name: 'RootQueryType',
		fields: {
			email: {
				type: GraphQLString,
				args: {
					item: {type: GraphQLEmail},
				},
				resolve: (root, {item}) => {
					return item;
				},
			},
			url: {
				type: GraphQLString,
				args: {
					item: {type: GraphQLURL},
				},
				resolve: (root, {item}) => {
					return item;
				},
			},
			limitedStringDefault: {
				type: GraphQLString,
				args: {
					item: {type: new GraphQLLimitedString()},
				},
				resolve: (root, {item}) => {
					return item;
				},
			},
			limitedStringMinMax: {
				type: GraphQLString,
				args: {
					item: {type: new GraphQLLimitedString(3, 10)},
				},
				resolve: (root, {item}) => {
					return item;
				},
			},
			limitedStringAlphabet: {
				type: GraphQLString,
				args: {
					item: {type: new GraphQLLimitedString(3, 10, 'abc123')},
				},
				resolve: (root, {item}) => {
					return item;
				},
			},
			password: {
				type: GraphQLString,
				args: {
					item: {type: new GraphQLPassword(0, undefined, undefined, {alphaNumeric: true})},
				},
				resolve: (root, {item}) => {
					return item;
				},
			},
			passwordMixedCase: {
				type: GraphQLString,
				args: {
					item: {type: new GraphQLPassword(0, undefined, undefined, {mixedCase: true})},
				},
				resolve: (root, {item}) => {
					return item;
				},
			},
			passwordSpecialChars: {
				type: GraphQLString,
				args: {
					item: {type: new GraphQLPassword(0, undefined, undefined, {specialChars: true})},
				},
				resolve: (root, {item}) => {
					return item;
				},
			},
			passwordAll: {
				type: GraphQLString,
				args: {
					item: {
						type: new GraphQLPassword(3, 6, 'abcABC123!"§', {
							specialChars: true,
							mixedCase: true,
							alphaNumeric: true,
						}),
					},
				},
				resolve: (root, {item}) => {
					return item;
				},
			},
			date: {
				type: GraphQLDateTime,
				args: {
					item: {type: GraphQLDateTime},
				},
				resolve: (root, {item}) => {
					expect(item).toBeInstanceOf(DateTime);

					return item;
				},
			},
			uuid: {
				type: GraphQLUUID,
				args: {
					item: {type: GraphQLUUID},
				},
				resolve: (root, {item}) => {
					return item;
				},
			},
			ipv4: {
				type: GraphQLIPv4,
				args: {
					item: {type: GraphQLIPv4},
				},
				resolve: (root, {item}) => {
					return item;
				},
			},
		},
	}),
});

export {
	schema,
};
