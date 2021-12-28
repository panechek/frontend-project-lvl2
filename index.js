import { readFileSync } from 'fs';
import getpath from './src/getPath.js';
import compare from './src/compare.js';

const genDiff = (filepath1, filepath2) => {
  const path1 = getpath(filepath1);
  const path2 = getpath(filepath2);
  const data1 = JSON.parse(readFileSync(path1));
  const data2 = JSON.parse(readFileSync(path2));
  const output = compare(data1, data2);
  return output;
};

export default genDiff;
