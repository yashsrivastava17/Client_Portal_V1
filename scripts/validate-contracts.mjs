#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { globSync } from 'glob';
import YAML from 'yaml';
import Ajv from 'ajv';
import addFormats from 'ajv-formats';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, '..');

const schemaPath = path.join(repoRoot, 'contracts', 'schema.json');
const schema = JSON.parse(fs.readFileSync(schemaPath, 'utf8'));

const ajv = new Ajv({ allErrors: true, strict: false });
addFormats(ajv);
const validate = ajv.compile(schema);

const contractsDir = path.join(repoRoot, 'contracts');
const patterns = [
  path.join(contractsDir, '**/*.yaml'),
  path.join(contractsDir, '**/*.yml'),
  path.join(contractsDir, '**/*.json')
];

let failed = 0;
for (const pattern of patterns) {
  const files = globSync(pattern, { nodir: true, ignore: ['**/schema.json'] });
  for (const file of files) {
    const content = fs.readFileSync(file, 'utf8');
    const data = file.endsWith('.json') ? JSON.parse(content) : YAML.parse(content);
    const ok = validate(data);
    if (!ok) {
      failed++;
      console.error(`\n❌ ${path.relative(repoRoot, file)} invalid:`);
      for (const err of validate.errors ?? []) {
        console.error(` - ${err.instancePath || '(root)'} ${err.message}`);
      }
    } else {
      console.log(`✅ ${path.relative(repoRoot, file)} valid`);
    }
  }
}

if (failed > 0) {
  console.error(`\n${failed} file(s) failed validation.`);
  process.exit(1);
} else {
  console.log('\nAll contracts valid.');
}

