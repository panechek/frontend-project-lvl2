import fs from 'fs';
// import ini from 'ini';
import yaml from 'js-yaml';
import * as path from 'path';

const parses = (filepath) => {
  const format = path.extname(filepath, 'utf8').slice(1);
  const data = fs.readFileSync(filepath, 'utf8');
  if (format === 'json') {
    return JSON.parse(data);
  }
  if (format === 'yml' || format === 'yaml') {
    return yaml.load(data);
  }
  throw new Error(`Error! Type ${format} is unknown.`);
};

export default parses;
