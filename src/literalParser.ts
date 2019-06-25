import {Kind, ValueNode} from 'graphql/language';

const createParseLiteral = (coerceType: (value: unknown) => string | void): (ast: ValueNode) => string | void => {
	return (ast: ValueNode): string | void => {
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

		return undefined;
	};
};

export {
	createParseLiteral,
};
