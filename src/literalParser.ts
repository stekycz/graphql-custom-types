import {Kind, ValueNode} from 'graphql/language';

const createParseLiteral = (coerceType: (value: unknown) => string | void): (ast: ValueNode) => string | void => {
	return (ast: ValueNode): string | void => {
		if (ast.kind !== Kind.STRING) {
			return undefined;
		}

		return coerceType(ast.value);
	};
};

export {
	createParseLiteral,
};
