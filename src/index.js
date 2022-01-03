import { readFileSync } from 'fs';
import * as path from 'path';
import compare from './compare.js';

const genDiff = (filepath1, filepath2) => {
  const data1 = JSON.parse(readFileSync(path.resolve(process.cwd(), filepath1)));
  const data2 = JSON.parse(readFileSync(path.resolve(process.cwd(), filepath2)));
  const output = compare(data1, data2);
  return output;
};

export default genDiff;
