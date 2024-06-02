const Ajv = require('ajv');
const ajv = new Ajv({ allErrors: true, $data: true });
require('ajv-keywords')(ajv);

const fs = require('fs');
const path = require('path');
const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');

const argv = yargs(hideBin(process.argv)).argv;

if (!argv.schema || !argv.data) {
  console.error('Please provide paths to the schema and data files using --schema and --data');
  process.exit(1);
}

const schemaPath = path.resolve(argv.schema);
const dataPath = path.resolve(argv.data);

// Load schema and data from files
const schema = JSON.parse(fs.readFileSync(schemaPath, 'utf8'));
const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

// Compile the schema
const validate = ajv.compile(schema);

// Validate the data
const valid = validate(data);

if (valid) {
  console.log('Data is valid');
} else {
  console.log('Data is invalid:', validate.errors);
}