import fs from 'fs';
// import ini from 'ini';
import yaml from 'js-yaml';
import * as path from 'path';

const parses = (filepath) => {
  const format = path.extname(filepath);
  const data = fs.readFileSync(filepath);
  let parse;
  if (format === '.json') {
    parse = JSON.parse;
  } else if (format === '.yml' || format === '.yaml') {
    parse = yaml.load;
  }
  //  else if (format === '.ini') {
  //   parse = ini.parse;
  // }
  return parse(data);
};

export default parses;
