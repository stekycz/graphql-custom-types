import {Kind, ValueNode} from 'graphql/language';

export type TypeCoercer<T> = (value: unknown) => T;

const createParseLiteral = <T>(coerceType: TypeCoercer<T>): (ast: ValueNode) => T | void => {
	return (ast: ValueNode): T | void => {
		if (ast.kind !== Kind.STRING) {
			return undefined;
		}

		return coerceType(ast.value);
	};
};

export {
	createParseLiteral,
};
