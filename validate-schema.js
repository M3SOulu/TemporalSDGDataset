const Ajv = require('ajv');
const ajv = new Ajv({ allErrors: true, $data: true });

require('ajv-keywords')(ajv);

const fs = require('fs');

// Load schema from file
const static_schema = JSON.parse(fs.readFileSync('json-static-sdg-schema.json', 'utf8'));
const temporal_schema = JSON.parse(fs.readFileSync('json-temporal-sdg-schema.json', 'utf8'));

// Validate the schema itself against the meta-schema for draft-07
const validateSchema = ajv.getSchema('http://json-schema.org/draft-07/schema');
const static_valid = validateSchema(static_schema);
const temporal_valid = validateSchema(temporal_schema);

if (static_valid) {
  console.log('Static SDG schema is valid');
} else {
  console.log('Static SDG schema is invalid:', validateSchema.errors);
}
if (temporal_valid) {
  console.log('Temporal SDG schema is valid');
} else {
  console.log('Temporal SDG schema is invalid:', validateSchema.errors);
}
