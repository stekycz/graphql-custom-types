// @flow

const lengthValidator = (name: string, value: string, min: number, max?: number): void => {
  if (value.length < min) {
    throw new TypeError(`${name} not long enough`);
  }

  if (max && value.length > max) {
    throw new TypeError(`${name} too long`);
  }
};

const alphabetValidator = (name: string, value: string, alphabet: string | string[]): void => {
  for (let char of value) {
    if (alphabet.indexOf(char) < 0) {
      throw new TypeError(`${name} has a not allowed character`);
    }
  }
};

export type ComplexityOptions = {
  alphaNumeric?: boolean,
  mixedCase?: boolean,
  specialChars?: boolean,
};

const complexityValidator = (name: string, value: string, options: ComplexityOptions = {}) => {
  const alphaNumericRe = /^(?=.*[0-9])(?=.*[a-zA-Z])(.+)$/;
  const mixedCaseRe = /^(?=.*[a-z])(?=.*[A-Z])(.+)$/;
  const specialCharsRe = /^(?=.*[^a-zA-Z0-9])(.+)$/;

  if (options.alphaNumeric && !alphaNumericRe.test(value)) {
    throw new TypeError(`${name} must contain at least one number and one letter`);
  }

  if (options.mixedCase && !mixedCaseRe.test(value)) {
    throw new TypeError(`${name} must contain at least one upper and one lower case letter`);
  }

  if (options.specialChars && !specialCharsRe.test(value)) {
    throw new TypeError(`${name} must contain at least one special character`);
  }
};

export {
  alphabetValidator,
  complexityValidator,
  lengthValidator,
}
