const Ajv = require('ajv');

const ajv = new Ajv({ allErrors: true });

const validate = (schema, data) => {
  if (!ajv.validate(schema, data)) {
    throw new TypeError(ajv.errorsText(ajv.errors));
  }
};

module.exports = {
  validate,
};
