import fs from 'fs';
// import ini from 'ini';
import yaml from 'js-yaml';
import * as path from 'path';

const parses = (filepath) => {
  const format = path.extname(filepath, 'utf8');
  const data = fs.readFileSync(filepath, 'utf8');
  let parse;
  if (format === '.json') {
    parse = JSON.parse;
  } else if (format === '.yml' || format === '.yaml') {
    parse = yaml.load;
  }
  return parse(data);
};

export default parses;
